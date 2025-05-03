import React, { useEffect, useState } from "react";
import {
    Calendar,
    dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import "./Appointments.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

Modal.setAppElement("#root");

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [userQuery, setUserQuery] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPetId, setSelectedPetId] = useState('');

    const [formData, setFormData] = useState({
        reason: "",
        time: "",
    });

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await fetch("http://localhost:5000/api/appointments", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    const mapped = data.map((appt) => ({
                        _id: appt._id,
                        title: `${appt?.pet?.name || "Pet"} - ${appt.reason}`,
                        start: new Date(appt.date),
                        end: new Date(new Date(appt.date).getTime() + 30 * 60000),
                        status: appt.status,
                        reason: appt.reason,
                        pet: appt.pet,
                        owner: appt.owner,
                        vet: appt.vet,
                    }));
                    setAppointments(mapped);
                } else {
                    console.error("Auth error:", data.message);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (userQuery.length < 3) {
                setUserResults([]);
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/api/auth/search-dropdown?q=${userQuery}`);
                const data = await res.json();
                setUserResults(data);
            } catch (err) {
                console.error('User search error:', err);
            }
        };

        const debounce = setTimeout(() => fetchUsers(), 300);
        return () => clearTimeout(debounce);
    }, [userQuery]);

    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        setModalOpen(true);
        setSelectedEvent(null);
        setFormData({ reason: "", time: "" });
        setSelectedPetId('');
        setSelectedUser(null);
        setUserQuery('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const appointmentDateTime = new Date(selectedDate);
        const [hours, minutes] = formData.time.split(":");
        appointmentDateTime.setHours(hours);
        appointmentDateTime.setMinutes(minutes);

        const payload = {
            pet: selectedPetId,
            owner: selectedUser.user._id,
            vet: "660fa8616e13f85fae0b3d78", // replace with actual vet ID if needed
            date: appointmentDateTime,
            reason: formData.reason,
            status: selectedEvent?.status || "booked",
        };

        try {
            if (selectedEvent && selectedEvent._id) {
                const res = await fetch(`http://localhost:5000/api/appointments/${selectedEvent._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
                    
                    body: JSON.stringify(payload),
                });
                const updated = await res.json();
                setAppointments((prev) =>
                    prev.map((appt) =>
                        appt._id === updated._id
                            ? {
                                ...appt,
                                title: `${updated?.pet?.name || "Pet"} - ${updated.reason}`,
                                start: new Date(updated.date),
                                end: new Date(new Date(updated.date).getTime() + 30 * 60000),
                                status: updated.status,
                            }
                            : appt
                    )
                );
            } else {
                const res = await fetch("http://localhost:5000/api/appointments", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify(payload),
                });
                const created = await res.json();
                setAppointments([
                    ...appointments,
                    {
                        _id: created._id,
                        title: `${created?.pet?.name || "Pet"} - ${created.reason}`,
                        start: new Date(created.date),
                        end: new Date(new Date(created.date).getTime() + 30 * 60000),
                        status: created.status,
                    },
                ]);
            }
        } catch (err) {
            console.error("Failed to submit appointment", err);
        }

        setModalOpen(false);
        setFormData({ reason: "", time: "" });
        setSelectedPetId('');
        setSelectedUser(null);
        setSelectedEvent(null);
    };

    const handleCancelAppointment = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/appointments/${selectedEvent._id}/cancel`, {
                method: "PATCH",
            });
            const cancelled = await res.json();
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt._id === cancelled._id ? { ...appt, status: "cancelled" } : appt
                )
            );
            setModalOpen(false);
            setSelectedEvent(null);
        } catch (err) {
            console.error("Cancel error:", err);
        }
    };

    return (
        <div className="appointments-wrapper">
            <div className="glass-card">
                <h2>Appointments</h2>
                <p>Click on a day to schedule a new appointment</p>
                <Calendar
                    localizer={localizer}
                    events={appointments}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    style={{ height: 500, marginTop: 30 }}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={(event) => {
                        setSelectedEvent(event);
                        setSelectedDate(event.start);
                        setFormData({
                            reason: event.reason || '',
                            time: new Date(event.start).toISOString().substr(11, 5),
                        });
                        setSelectedPetId(event.pet?._id || '');
                        setSelectedUser({ user: event.owner, pets: [event.pet] }); // minimal safe fallback
                        setModalOpen(true);
                    }}
                    eventPropGetter={(event) => {
                        let backgroundColor = "#4caf50";
                        if (event.status === "cancelled") backgroundColor = "#e53935";
                        else if (event.status === "completed") backgroundColor = "#1e88e5";
                        return {
                            style: {
                                backgroundColor,
                                color: "#fff",
                                borderRadius: "6px",
                                padding: "4px 8px",
                            },
                        };
                    }}
                />
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="New Appointment"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>{selectedEvent ? "Edit Appointment" : "New Appointment"}</h2>
                <form onSubmit={handleSubmit}>
                    {!selectedEvent && (
                        <>
                            <label>Search User (name or ID)</label>
                            <input
                                type="text"
                                value={userQuery}
                                onChange={(e) => {
                                    setUserQuery(e.target.value);
                                    setSelectedUser(null);
                                    setSelectedPetId('');
                                }}
                                placeholder="Type at least 3 characters..."
                                required
                            />

                            {userResults.length > 0 && (
                                <select
                                    onChange={(e) => {
                                        const selected = userResults.find(u => u.user._id === e.target.value);
                                        setSelectedUser(selected);
                                        setSelectedPetId('');
                                    }}
                                >
                                    <option value="">Select a user</option>
                                    {userResults.map((result) => (
                                        <option key={result.user._id} value={result.user._id}>
                                            {result.user.fullName} ({result.pets.length} pet{result.pets.length !== 1 ? 's' : ''})
                                        </option>
                                    ))}
                                </select>
                            )}

                            {selectedUser && selectedUser.pets.length > 0 && (
                                <>
                                    <label>Select Pet</label>
                                    <select
                                        value={selectedPetId}
                                        onChange={(e) => setSelectedPetId(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a pet</option>
                                        {selectedUser.pets.map((pet) => (
                                            <option key={pet._id} value={pet._id}>
                                                {pet.name} ({pet.species})
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </>
                    )}

                    <label>Reason</label>
                    <input
                        type="text"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        required
                    />

                    <label>Time</label>
                    <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                    />

                    <div className="modal-btns">
                        <button type="submit" disabled={!selectedEvent && (!selectedUser || !selectedPetId)}>Save</button>
                        <button type="button" onClick={() => setModalOpen(false)}>Close</button>
                    </div>

                    {selectedEvent && (
                        <button type="button" className="cancel-btn" onClick={handleCancelAppointment}>
                            Cancel Appointment
                        </button>
                    )}
                </form>
            </Modal>
        </div>
    );
};

export default Appointments;

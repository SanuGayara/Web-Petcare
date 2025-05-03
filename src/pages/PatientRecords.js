import React, { useEffect, useState } from "react";
import "./PatientRecords.css";
import { useNavigate } from "react-router-dom";

const PatientRecord = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState("");

  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    description: "",
    prescription: "",
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchRecords = async (query = "") => {
    if (!token) return navigate("/login");

    try {
      setLoading(true);
      const endpoint =
          query.length >= 3
              ? `http://localhost:5000/api/medical-records/search/pet?q=${query}`
              : "http://localhost:5000/api/medical-records/my-records";

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
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
        console.error("User search error", err);
      }
    };

    const debounce = setTimeout(fetchUsers, 300);
    return () => clearTimeout(debounce);
  }, [userQuery]);

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    if (!selectedPetId || !selectedUser) return;

    try {
      const res = await fetch("http://localhost:5000/api/medical-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pet: selectedPetId,
          description: formData.description,
          diagnosis: formData.diagnosis,
          treatment: formData.treatment,
          prescription: formData.prescription,
        }),
      });

      const newRecord = await res.json();

      if (res.ok) {
        setRecords((prev) => [...prev, newRecord]);
        resetCreateForm();
      } else {
        console.error("Create failed:", newRecord.message);
      }
    } catch (err) {
      console.error("Create error", err);
    }
  };

  const resetCreateForm = () => {
    setCreating(false);
    setSelectedUser(null);
    setSelectedPetId("");
    setUserQuery("");
    setFormData({
      diagnosis: "",
      treatment: "",
      description: "",
      prescription: "",
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length >= 3 || value.length === 0) fetchRecords(value);
  };

  return (
      <div className="digital-record-page">
        <div className="glass-panel">
          <h2>Patient Medical Records</h2>
          <p>Search, view and create new medical records</p>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Search by Pet Name or ID..."
                value={search}
                onChange={handleSearch}
                style={{ flex: 1, marginRight: "10px" }}
            />
            <button onClick={() => setCreating(true)} className="create-btn">
              + Add Record
            </button>
          </div>

          {creating && (
              <form className="create-record-form" onSubmit={handleCreateRecord}>
                <input
                    type="text"
                    placeholder="Search user by name or ID"
                    value={userQuery}
                    onChange={(e) => {
                      setUserQuery(e.target.value);
                      setSelectedUser(null);
                      setSelectedPetId("");
                    }}
                />

                {userResults.length > 0 && (
                    <select
                        onChange={(e) => {
                          const u = userResults.find((u) => u.user._id === e.target.value);
                          setSelectedUser(u);
                          setSelectedPetId("");
                        }}
                    >
                      <option>Select User</option>
                      {userResults.map((u) => (
                          <option key={u.user._id} value={u.user._id}>
                            {u.user.fullName} ({u.pets.length} pets)
                          </option>
                      ))}
                    </select>
                )}

                {selectedUser && (
                    <select
                        value={selectedPetId}
                        onChange={(e) => setSelectedPetId(e.target.value)}
                        required
                    >
                      <option>Select Pet</option>
                      {selectedUser.pets.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name} ({p.species})
                          </option>
                      ))}
                    </select>
                )}

                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Treatment"
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Prescription"
                    value={formData.prescription}
                    onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                />
                <div className="modal-btns">
                  <button type="submit">Save Record</button>
                  <button type="button" onClick={resetCreateForm}>Cancel</button>
                </div>
              </form>
          )}

          {loading ? (
              <p className="loading">Loading records...</p>
          ) : records.length === 0 ? (
              <p className="no-records">No records found.</p>
          ) : (
              <table className="record-table">
                <thead>
                <tr>
                  <th>Pet Name</th>
                  <th>Species</th>
                  <th>Vet</th>
                  <th>Visit Date</th>
                  <th>Diagnosis</th>
                  <th>Treatment</th>
                </tr>
                </thead>
                <tbody>
                {records.map((rec) => (
                    <tr key={rec._id}>
                      <td>{rec.pet?.name || "Unknown"}</td>
                      <td>{rec.pet?.species || "-"}</td>
                      <td>{rec.vet?.fullName || "Vet"}</td>
                      <td>{new Date(rec.visitDate).toLocaleDateString()}</td>
                      <td>{rec.diagnosis || "-"}</td>
                      <td>{rec.treatment || "-"}</td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>
      </div>
  );
};

export default PatientRecord;

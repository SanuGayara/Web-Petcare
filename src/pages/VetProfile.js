import React, { useEffect, useState } from "react";
import "./VetProfile.css";
import avatarImg from "../assets/avatar.png"; // optional placeholder image

function VetProfile() {
    const [vet, setVet] = useState(null);

    useEffect(() => {
        const fetchVet = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch("http://localhost:5000/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setVet(data);
                } else {
                    console.error("Profile fetch error:", data.message);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchVet();
    }, []);

    return (
        <div className="vet-profile-container">
            <div className="vet-card">
                <div className="vet-banner" />
                <div className="vet-body">
                    <div className="vet-avatar">
                        <img
                            src={avatarImg}
                            alt="Vet Avatar"
                            className="vet-avatar-img"
                        />
                    </div>
                    {vet ? (
                        <>
                            <h2>{vet.fullName}</h2>
                            <p className="email">{vet.email}</p>
                            <p><strong>Phone:</strong> {vet.phone}</p>
                            <p><strong>User Type:</strong> {vet.type === 1 ? "Veterinarian" : "Owner"}</p>
                            <p><strong>Joined:</strong> {new Date(vet.createdAt).toLocaleDateString()}</p>
                            <p className="bio">
                                Passionate about pet care. Dedicated to delivering the best health services for your furry friends. 🐾
                            </p>
                        </>
                    ) : (
                        <p className="loading">Loading vet profile...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VetProfile;

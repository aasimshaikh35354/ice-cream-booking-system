import React, { useEffect, useState } from "react";
import "./DeliveryBoyManagement.css"; // Ensure this file exists
import Header from '../../components/Vendor Components/VendorHeader/Header';
import Footer from '../../components/Common Components/Footer';

const API_URL = "http://localhost:5000/api/delivery-boys";

const DeliveryBoyManagement = () => {
    const [deliveryBoys, setDeliveryBoys] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [editId, setEditId] = useState(null); // Track ID for editing

    useEffect(() => {
        fetchDeliveryBoys();
    }, []);

    const fetchDeliveryBoys = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setDeliveryBoys(data);
        } catch (error) {
            console.error("Error fetching delivery boys:", error);
        }
    };

    const handleSubmit = async () => {
        if (!name.trim() || !phone.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            if (editId) {
                // Update existing delivery boy
                await fetch(`${API_URL}/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, phone })
                });
            } else {
                // Add new delivery boy
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, phone })
                });
            }

            setName("");
            setPhone("");
            setEditId(null);
            fetchDeliveryBoys();
        } catch (error) {
            console.error("Error adding/updating delivery boy:", error);
        }
    };

    const handleEdit = (boy) => {
        setName(boy.name);
        setPhone(boy.phone);
        setEditId(boy._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this delivery boy?")) return;

        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchDeliveryBoys();
        } catch (error) {
            console.error("Error deleting delivery boy:", error);
        }
    };

    return (
        <div style={{ paddingTop: '3%' }}>
            <Header />
            <div className="delivery-container">
                {/* Heading */}
                <h1 className="heading">
                    Manage <span className="highlight">Delivery Boys</span>
                </h1>

                {/* Form */}
                <div className="form-container">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Delivery Boy Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button className="btn-submit" onClick={handleSubmit}>
                        {editId ? "Update Delivery Boy" : "Add Delivery Boy"}
                    </button>
                </div>

                {/* Delivery Boys Table */}
                <div className="table-container">
                    <h2 className="table-heading">Delivery Boys List</h2>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveryBoys.length > 0 ? (
                                deliveryBoys.map((boy, index) => (
                                    <tr key={boy._id}>
                                        <td>{index + 1}</td>
                                        <td>{boy.name}</td>
                                        <td>{boy.phone}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => handleEdit(boy)}>Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(boy._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="no-data">
                                        No delivery boys found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DeliveryBoyManagement;

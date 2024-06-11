import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        fullName: '',
        bloodType: '',
        bloodPressure: '',
        disease: '',
        medication: ''
    });

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/add', form);
            fetchUsers(); // Refresh the user list
            setForm({
                fullName: '',
                bloodType: '',
                bloodPressure: '',
                disease: '',
                medication: ''
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>User Data</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="text"
                    name="bloodType"
                    value={form.bloodType}
                    onChange={handleChange}
                    placeholder="Blood Type"
                    required
                />
                <input
                    type="text"
                    name="bloodPressure"
                    value={form.bloodPressure}
                    onChange={handleChange}
                    placeholder="Blood Pressure"
                    required
                />
                <input
                    type="text"
                    name="disease"
                    value={form.disease}
                    onChange={handleChange}
                    placeholder="Disease"
                    required
                />
                <input
                    type="text"
                    name="medication"
                    value={form.medication}
                    onChange={handleChange}
                    placeholder="Medication"
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.fullName} - {user.bloodType} - {user.bloodPressure} - {user.disease} - {user.medication} - {new Date(user.dateTime).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

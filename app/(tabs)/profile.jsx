import React, { useState } from 'react';

function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() && formData.email.trim()) {
      setProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
      });
      alert('Profile updated successfully!');
      setFormData({ name: '', email: '' });
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div style={{
      maxWidth: '400px', margin: '50px auto', padding: '20px',
      border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center' }}>User Profile</h2>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
        />

        <label htmlFor="email" style={{ marginTop: '10px', display: 'block' }}>Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
        />

        <button
          type="submit"
          style={{
            marginTop: '15px',
            padding: '10px 15px',
            width: '100%',
            backgroundColor: '#007bff',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

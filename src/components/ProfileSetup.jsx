import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import './ProfileSetup.css';

function ProfileSetup({ onComplete }) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !gender) {
      alert('Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name,
        phone,
        gender,
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString()
      });
      onComplete();
    } catch (error) {
      alert('Error saving profile. Please try again.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-box">
        <h2>Complete Your Profile</h2>
        <p>Please provide the following details</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;
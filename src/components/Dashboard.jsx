import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('groups');

  // -------- FETCH GROUPS (Real-time) --------
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'groups'), where('ownerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupList);
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);

  // -------- FETCH SUBJECTS (Real-time) for selected group --------
  useEffect(() => {
    if (!selectedGroup) {
      setSubjects([]);
      return;
    }
    const q = query(collection(db, 'subjects'), where('groupId', '==', selectedGroup.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subjectList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubjects(subjectList);
    });
    return unsubscribe;
  }, [selectedGroup]);

  // -------- CREATE GROUP --------
  const handleCreateGroup = async () => {
    const name = prompt('Enter group name (e.g., "My Kids\' Learning")');
    if (!name) return;
    try {
      await addDoc(collection(db, 'groups'), {
        name,
        ownerId: user.uid,
        members: 1,
        pricePerPerson: 0,
        createdAt: new Date().toISOString()
      });
      alert('Group created successfully!');
    } catch (error) {
      alert('Error creating group: ' + error.message);
    }
  };

  // -------- DELETE GROUP --------
  const handleDeleteGroup = async (groupId) => {
    if (!confirm('Delete this group and all its subjects?')) return;
    try {
      const subQuery = query(collection(db, 'subjects'), where('groupId', '==', groupId));
      const subSnapshot = await getDocs(subQuery);
      subSnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, 'subjects', docSnap.id));
      });
      await deleteDoc(doc(db, 'groups', groupId));
      if (selectedGroup?.id === groupId) setSelectedGroup(null);
      alert('Group deleted!');
    } catch (error) {
      alert('Error deleting group: ' + error.message);
    }
  };

  // -------- ADD SUBJECT & TOPIC --------
  const handleAddSubject = async () => {
    if (!selectedGroup) {
      alert('Please select a group first.');
      return;
    }
    const name = prompt('Enter subject name (e.g., "Mathematics")');
    if (!name) return;
    const topic = prompt('Enter topic/chapter (e.g., "Algebra Basics")');
    if (!topic) return;

    try {
      await addDoc(collection(db, 'subjects'), {
        groupId: selectedGroup.id,
        name,
        topic,
        createdAt: new Date().toISOString()
      });
      alert('Subject added!');
    } catch (error) {
      alert('Error adding subject: ' + error.message);
    }
  };

  // -------- DELETE SUBJECT --------
  const handleDeleteSubject = async (subjectId) => {
    if (!confirm('Delete this subject?')) return;
    try {
      await deleteDoc(doc(db, 'subjects', subjectId));
    } catch (error) {
      alert('Error deleting subject: ' + error.message);
    }
  };

  // -------- UPDATE PAYMENT --------
  const handleUpdatePrice = async (groupId, currentPrice) => {
    const newPrice = prompt('Enter amount you want to pay per person (₹):', currentPrice || '0');
    if (newPrice === null) return;
    const priceNum = Number(newPrice);
    if (isNaN(priceNum) || priceNum < 0) {
      alert('Please enter a valid number.');
      return;
    }
    try {
      await updateDoc(doc(db, 'groups', groupId), {
        pricePerPerson: priceNum
      });
      alert('Payment amount updated!');
    } catch (error) {
      alert('Error updating price: ' + error.message);
    }
  };

  // -------- LOGOUT (with callback) --------
  const handleLogout = async () => {
    await signOut(auth);
    if (onLogout) onLogout();
  };

  // -------- RENDER GROUPS TAB --------
  const renderGroupsTab = () => (
    <div className="dashboard-tab">
      <div className="tab-header">
        <h2>My Groups</h2>
        <button className="btn-primary" onClick={handleCreateGroup}>+ Create New Group</button>
      </div>
      {groups.length === 0 ? (
        <p className="empty-message">You haven't created any groups yet. Click "Create New Group" to start!</p>
      ) : (
        <div className="group-list">
          {groups.map((group) => (
            <div
              key={group.id}
              className={`group-card ${selectedGroup?.id === group.id ? 'active' : ''}`}
              onClick={() => setSelectedGroup(group)}
            >
              <div className="group-info">
                <h3>{group.name}</h3>
                <p>Members: {group.members || 1} | ₹{group.pricePerPerson || 0}/person</p>
              </div>
              <div className="group-actions">
                <button
                  className="btn-sm btn-secondary"
                  onClick={(e) => { e.stopPropagation(); setSelectedGroup(group); setActiveTab('subjects'); }}
                >
                  View Subjects
                </button>
                <button
                  className="btn-sm btn-danger"
                  onClick={(e) => { e.stopPropagation(); handleDeleteGroup(group.id); }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // -------- RENDER SUBJECTS TAB --------
  const renderSubjectsTab = () => (
    <div className="dashboard-tab">
      <div className="tab-header">
        <button className="btn-back" onClick={() => { setSelectedGroup(null); setActiveTab('groups'); }}>
          ← Back to Groups
        </button>
        <h2>{selectedGroup?.name} – Subjects</h2>
        <button className="btn-primary" onClick={handleAddSubject}>+ Add Subject</button>
      </div>
      {subjects.length === 0 ? (
        <p className="empty-message">No subjects yet. Click "Add Subject" to start teaching!</p>
      ) : (
        <div className="subject-list">
          {subjects.map((sub) => (
            <div key={sub.id} className="subject-card">
              <div className="subject-info">
                <h4>{sub.name}</h4>
                <p>Topic: {sub.topic}</p>
              </div>
              <button
                className="btn-sm btn-danger"
                onClick={() => handleDeleteSubject(sub.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // -------- RENDER SETTINGS TAB --------
  const renderSettingsTab = () => {
    const group = selectedGroup;
    if (!group) {
      return (
        <div className="dashboard-tab">
          <p className="empty-message">Please select a group first from the "My Groups" tab.</p>
        </div>
      );
    }
    return (
      <div className="dashboard-tab">
        <div className="tab-header">
          <button className="btn-back" onClick={() => setActiveTab('groups')}>
            ← Back
          </button>
          <h2>Payment Settings – {group.name}</h2>
        </div>
        <div className="settings-card">
          <p><strong>Current Contribution:</strong> ₹{group.pricePerPerson || 0} per person</p>
          <button
            className="btn-primary"
            onClick={() => handleUpdatePrice(group.id, group.pricePerPerson)}
          >
            Change Payment Amount
          </button>
          <p className="settings-note">
            * This is the amount you pay to MYOS per person in this group.
          </p>
        </div>
      </div>
    );
  };

  // -------- MAIN DASHBOARD LAYOUT --------
  return (
    <div className="dashboard-container">
      <div className="dashboard-topbar">
        <h1>👋 Welcome, {user?.displayName || 'Parent'}!</h1>
        <div className="user-info">
          <span>{user?.email}</span>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="dashboard-sidebar">
          <button
            className={`sidebar-btn ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            📚 My Groups
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
            disabled={!selectedGroup}
          >
            📖 Subjects & Topics
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            disabled={!selectedGroup}
          >
            ⚙️ Payment Settings
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'groups' && renderGroupsTab()}
          {activeTab === 'subjects' && renderSubjectsTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </div>
    </div>
  );
}

// ✅ THIS IS THE IMPORTANT LINE – make sure it's at the bottom!
export default Dashboard;
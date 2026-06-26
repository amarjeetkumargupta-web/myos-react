import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import CustomSection from './components/CustomSection';
import WhySection from './components/WhySection';
import HowSection from './components/HowSection';
import TestimonialSection from './components/TestimonialSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import { db } from './firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './App.css';

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustSection />
      <CustomSection />
      <WhySection />
      <HowSection />
      <TestimonialSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const [profileComplete, setProfileComplete] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setCheckingProfile(false);
        return;
      }
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setProfileComplete(docSnap.exists());
      } catch (error) {
        console.error('Error checking profile:', error);
      }
      setCheckingProfile(false);
    };
    checkProfile();
  }, [user]);

  if (loading || checkingProfile) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user) {
    return <LandingPage />;
  }

  if (!profileComplete) {
    return <ProfileSetup onComplete={() => setProfileComplete(true)} />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
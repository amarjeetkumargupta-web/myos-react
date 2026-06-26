import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase/firebase';
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

// ----- LANDING PAGE -----
function LandingPage({ onLogin }) {
  useEffect(() => {
    const checkReveal = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    checkReveal();
    const timer = setTimeout(checkReveal, 300);
    window.addEventListener('scroll', checkReveal);
    return () => {
      window.removeEventListener('scroll', checkReveal);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Navbar onLogin={onLogin} />
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

// ----- MAIN APP -----
function AppContent() {
  const { user, loading } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  // On mount, check if we have a pending login intent
  useEffect(() => {
    const intent = localStorage.getItem('myos_intent');
    if (intent === 'dashboard') {
      setShowDashboard(true);
      // Keep the flag; we'll clear it after processing redirect result
    }
  }, []);

  // Handle redirect result after coming back from Google
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('✅ Login successful');
          // Clear the intent flag
          localStorage.removeItem('myos_intent');
          setShowDashboard(true);
        } else {
          // If we have a pending intent but no result, clear it
          if (localStorage.getItem('myos_intent')) {
            localStorage.removeItem('myos_intent');
          }
          // If we had showDashboard true but no user, reset
          if (showDashboard && !user) {
            setShowDashboard(false);
          }
        }
      } catch (error) {
        console.error('Redirect error:', error.message);
        localStorage.removeItem('myos_intent');
        setShowDashboard(false);
      }
    };
    handleRedirect();
  }, []);

  // Check profile when user and showDashboard are true
  useEffect(() => {
    const checkProfile = async () => {
      if (!user || !showDashboard) {
        setCheckingProfile(false);
        return;
      }
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setProfileComplete(docSnap.exists());
      } catch (error) {
        console.error('Profile check error:', error);
      }
      setCheckingProfile(false);
    };
    checkProfile();
  }, [user, showDashboard]);

  const handleLoginClick = () => {
    // Store intent, but DO NOT set showDashboard yet.
    localStorage.setItem('myos_intent', 'dashboard');
    // The actual redirect will happen in Navbar.
    // The redirect will take the user away; after return, getRedirectResult will set showDashboard.
  };

  const handleLogout = () => {
    localStorage.removeItem('myos_intent');
    setShowDashboard(false);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  // If we are not showing dashboard, show the landing page
  if (!showDashboard) {
    return <LandingPage onLogin={handleLoginClick} />;
  }

  // If we are showing dashboard but user is not logged in, go back
  if (!user) {
    localStorage.removeItem('myos_intent');
    setShowDashboard(false);
    return <LandingPage onLogin={handleLoginClick} />;
  }

  if (checkingProfile) {
    return <div className="loading-screen">Loading profile...</div>;
  }

  if (!profileComplete) {
    return <ProfileSetup onComplete={() => setProfileComplete(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}

// ----- WRAPPER -----
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import CustomSection from './components/CustomSection';
import WhySection from './components/WhySection';
import HowSection from './components/HowSection';
import TestimonialSection from './components/TestimonialSection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <TrustSection />
      <CustomSection />
      <WhySection />
      <HowSection />
      <TestimonialSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  );
}

export default App;
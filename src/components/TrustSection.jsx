import React from 'react';
import './TrustSection.css';

function TrustSection() {
  return (
    <section className="trust-section reveal">
      <div className="trust-card">
        <div className="trust-item"><h2>500+</h2><p>Parent Groups</p></div>
        <div className="trust-divider"></div>
        <div className="trust-item"><h2>10+</h2><p>Cities</p></div>
        <div className="trust-divider"></div>
        <div className="trust-item"><h2>95%</h2><p>Parent Satisfaction</p></div>
        <div className="trust-divider"></div>
        <div className="trust-item"><h2>1000+</h2><p>Students</p></div>
      </div>
    </section>
  );
}
export default TrustSection;
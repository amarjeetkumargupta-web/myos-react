import React from 'react';
import './CtaSection.css';

function CtaSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-section reveal">
      <div className="cta-box">
        <h2>Ready To Build The School Your Child Deserves?</h2>
        <p>Join hundreds of parents creating personalized schools through MYOS.</p>
        <div className="cta-buttons">
          <button className="primary-btn" onClick={() => scrollTo('pricing')}>Start Your School</button>
          <button className="secondary-btn" onClick={() => alert('Schedule a call – we’ll contact you soon!')}>Schedule a Call</button>
        </div>
      </div>
    </section>
  );
}
export default CtaSection;
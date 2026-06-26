import React from 'react';
import './CustomSection.css';

const features = [
  { icon: '📚', title: 'Curriculum', desc: 'Choose CBSE, ICSE, International or custom curriculum.' },
  { icon: '🎯', title: 'Skills', desc: 'Coding, AI, Robotics, Entrepreneurship and more.' },
  { icon: '👨‍🏫', title: 'Teachers', desc: 'Select expert teachers and mentors for your group.' },
  { icon: '⏰', title: 'Timings', desc: 'Flexible schedules designed around your needs.' },
  { icon: '🍎', title: 'Food', desc: 'Decide nutrition plans and healthy meal options.' },
  { icon: '🌍', title: 'Languages', desc: 'Choose regional and international languages.' },
  { icon: '⚽', title: 'Activities', desc: 'Sports, music, arts and extracurricular activities.' },
  { icon: '🏡', title: 'Environment', desc: 'Home learning, hybrid learning or physical centers.' }
];

function CustomSection() {
  return (
    <section className="custom-section reveal">
      <div className="section-heading">
        <span>FULL CUSTOMIZATION</span>
        <h2>Design Every Aspect Of Your Child's Education</h2>
        <p>Create a learning experience that matches your child's future, not a one-size-fits-all school model.</p>
      </div>
      <div className="custom-grid">
        {features.map((f, i) => (
          <div className="custom-card" key={i}>
            <div className="icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default CustomSection;
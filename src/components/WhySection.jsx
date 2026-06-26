import React from 'react';
import './WhySection.css';

const reasons = [
  { icon: '🛡️', title: 'Full Control', desc: 'Parents decide curriculum, teachers, activities and learning methods.' },
  { icon: '🎯', title: 'Personalized Learning', desc: 'Every learning experience can be customized for children.' },
  { icon: '💰', title: 'Affordable Education', desc: 'No unnecessary overhead costs and hidden fees.' },
  { icon: '🏡', title: 'Learn From Home', desc: 'Flexible learning environments with hybrid options.' },
  { icon: '🚀', title: 'Future Ready Skills', desc: 'Focus on coding, AI, communication and entrepreneurship.' },
  { icon: '❤️', title: 'Happy Children', desc: 'Less pressure, more curiosity and meaningful learning.' }
];

function WhySection() {
  return (
    <section className="why-section reveal" id="benefits">
      <div className="section-heading">
        <span>WHY MYOS</span>
        <h2>Why Parents Choose MYOS</h2>
        <p>A new approach to education where parents gain control, children learn better, and schools are built around real needs.</p>
      </div>
      <div className="why-grid">
        {reasons.map((r, i) => (
          <div className="why-card" key={i}>
            <div className="why-icon">{r.icon}</div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default WhySection;
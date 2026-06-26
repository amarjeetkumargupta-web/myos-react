import React from 'react';
import './HowSection.css';

const steps = [
  { num: '01', title: 'Create a Parent Group', desc: 'Connect with parents who share similar educational goals.' },
  { num: '02', title: 'Customize Learning', desc: 'Decide curriculum, teachers, skills and activities.' },
  { num: '03', title: 'MYOS Sets Everything Up', desc: 'Infrastructure, scheduling and management handled by us.' },
  { num: '04', title: 'Launch Your School', desc: 'Start learning through your customized educational model.' },
  { num: '05', title: 'Track Growth', desc: 'Monitor progress, performance and outcomes.' }
];

function HowSection() {
  return (
    <section className="how-section reveal" id="how-it-works">
      <div className="section-heading">
        <span>HOW IT WORKS</span>
        <h2>Build Your Own School In 5 Simple Steps</h2>
        <p>MYOS handles the operations while parents design the educational experience.</p>
      </div>
      <div className="timeline">
        {steps.map((s, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-number">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default HowSection;
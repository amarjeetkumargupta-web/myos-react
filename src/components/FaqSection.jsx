import React, { useState } from 'react';
import './FaqSection.css';

const faqs = [
  { q: 'Can I create a school without educational experience?', a: 'Yes. MYOS handles operations, teacher support, infrastructure and management while you focus on your educational vision.' },
  { q: 'How many students are required?', a: 'You can start with a small group of students and expand as your community grows.' },
  { q: 'Can we choose our own curriculum?', a: 'Absolutely. Parents can customize curriculum, skills, activities, languages and learning methods.' },
  { q: 'Does MYOS provide teachers?', a: 'Yes. We help recruit, train and manage qualified educators for your school.' }
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="faq-section reveal" id="faq">
      <div className="section-heading">
        <span>FAQ</span>
        <h2>Frequently Asked Questions</h2>
        <p>Everything parents want to know before starting their own school.</p>
      </div>
      <div className="faq-container">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div className="faq-item" key={i}>
              <h3 onClick={() => toggle(i)} style={{ cursor: 'pointer' }}>{item.q}</h3>
              <p style={{ maxHeight: isOpen ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>{item.a}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default FaqSection;
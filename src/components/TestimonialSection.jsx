import React from 'react';
import './TestimonialSection.css';

const testimonials = [
  { quote: 'MYOS helped us build a school focused on coding, creativity and practical learning. My child is more excited about education than ever before.', name: 'Priya Sharma', place: 'Parent, Delhi' },
  { quote: 'We wanted flexible timings and skill-based education. MYOS made it possible without the hassle of managing everything ourselves.', name: 'Rahul Verma', place: 'Parent, Bangalore' },
  { quote: 'Instead of adjusting our children to a school, we created a school around our children’s needs.', name: 'Anjali Mehta', place: 'Parent, Mumbai' }
];

function TestimonialSection() {
  return (
    <section className="testimonial-section reveal">
      <div className="section-heading">
        <span>SUCCESS STORIES</span>
        <h2>What Parents Are Saying</h2>
        <p>Families across India are already creating personalized learning experiences with MYOS.</p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <div className="quote">❝</div>
            <p>{t.quote}</p>
            <div className="parent-info">
              <h4>{t.name}</h4>
              <span>{t.place}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default TestimonialSection;
import React from 'react';
import './PricingSection.css';

function PricingSection() {
  return (
    <section className="pricing-section reveal" id="pricing">
      <div className="section-heading">
        <span>PLANS</span>
        <h2>Start Your Own School</h2>
        <p>Choose the plan that fits your parent community and educational vision.</p>
      </div>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h3>Starter</h3>
          <div className="price">₹49,999</div>
          <p className="price-text">Perfect for small parent groups.</p>
          <ul>
            <li>✔ Up to 20 Students</li>
            <li>✔ Curriculum Planning</li>
            <li>✔ Teacher Support</li>
            <li>✔ Parent Dashboard</li>
            <li>✔ Basic Setup Assistance</li>
          </ul>
          <a href="#" className="plan-btn" onClick={(e) => { e.preventDefault(); alert('Starter plan selected!'); }}>Get Started</a>
        </div>
        <div className="pricing-card featured-plan">
          <div className="popular-tag">MOST POPULAR</div>
          <h3>Growth</h3>
          <div className="price">₹99,999</div>
          <p className="price-text">Ideal for growing communities.</p>
          <ul>
            <li>✔ Up to 50 Students</li>
            <li>✔ Full School Setup</li>
            <li>✔ Teacher Hiring</li>
            <li>✔ Activity Planning</li>
            <li>✔ Food Program Setup</li>
            <li>✔ Dedicated Support</li>
          </ul>
          <a href="#" className="plan-btn" onClick={(e) => { e.preventDefault(); alert('Growth plan selected!'); }}>Start Now</a>
        </div>
        <div className="pricing-card">
          <h3>Enterprise</h3>
          <div className="price">Custom</div>
          <p className="price-text">Large-scale custom schools.</p>
          <ul>
            <li>✔ Unlimited Students</li>
            <li>✔ Complete Infrastructure</li>
            <li>✔ Custom Curriculum</li>
            <li>✔ Dedicated Team</li>
            <li>✔ Multi-City Expansion</li>
          </ul>
          <a href="#" className="plan-btn" onClick={(e) => { e.preventDefault(); alert('Contact sales for Enterprise plan.'); }}>Contact Sales</a>
        </div>
      </div>
    </section>
  );
}
export default PricingSection;
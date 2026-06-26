import React from 'react';
import './Hero.css';
import heroImage from '../assets/hero-image.png';

function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <h1>Don't Choose a School, <span>Create One.</span></h1>
        <p>MYOS empowers parents to build customized schools designed around their children's future.</p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => scrollTo('pricing')}>Create Your School</button>
          <button className="secondary-btn" onClick={() => scrollTo('how-it-works')}>How It Works</button>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-image-container">
          <img src={heroImage} alt="MYOS Hero" />
          <div className="badge badge-1">📖 Custom Syllabus</div>
          <div className="badge badge-2">👨‍🏫 Expert Teachers</div>
          <div className="badge badge-3">⏰ Flexible Timings</div>
          <div className="badge badge-4">🎓 Skill Learning</div>
          <div className="badge badge-5">🍎 Healthy Food</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
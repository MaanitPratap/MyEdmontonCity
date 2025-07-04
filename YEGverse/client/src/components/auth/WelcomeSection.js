import React from 'react';
import '../../styles/WelcomeSection.css';

const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      <h1 className="welcome-title">Welcome to YEGverse</h1>
      <p className="welcome-subtitle">
        Your gateway to Edmonton's digital community. Connect, explore, and engage with the vibrant YEG ecosystem.
      </p>
      <ul className="welcome-features">
        <li>Discover local events and activities</li>
        <li>Connect with fellow Edmontonians</li>
        <li>Share your YEG experiences</li>
        <li>Stay updated with city happenings</li>
      </ul>
    </div>
  );
};

export default WelcomeSection;
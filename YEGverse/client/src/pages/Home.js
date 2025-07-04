import React from 'react';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">Welcome to YEGverse</h1>
                <p className="hero-subtitle">
                    Your gateway to Edmonton's vibrant digital community. Connect, explore, and engage with the heart of YEG.
                </p>
                <div className="cta-buttons">
                    <button className="cta-button cta-button-primary">
                        🚀 Explore YEG
                    </button>
                    <button className="cta-button cta-button-secondary">
                        📍 Discover Events
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <h2 className="features-title">Discover Edmonton Like Never Before</h2>
                    <p className="features-subtitle">
                        Connect with your community through our comprehensive platform designed for Edmontonians
                    </p>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <span className="feature-icon">🏛️</span>
                            <h3 className="feature-title">Local Events</h3>
                            <p className="feature-description">
                                Stay updated with the latest happenings around Edmonton. From festivals to community meetups, never miss what's happening in YEG.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <span className="feature-icon">🤝</span>
                            <h3 className="feature-title">Community Connect</h3>
                            <p className="feature-description">
                                Meet like-minded Edmontonians and build meaningful connections. Share experiences and create lasting friendships in our community.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <span className="feature-icon">📱</span>
                            <h3 className="feature-title">YEG Stories</h3>
                            <p className="feature-description">
                                Share your Edmonton experiences and discover hidden gems through the eyes of fellow residents. Your story matters in YEGverse.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <span className="feature-icon">🌟</span>
                            <h3 className="feature-title">Local Business</h3>
                            <p className="feature-description">
                                Support and discover amazing local businesses. From cafes to startups, explore what makes Edmonton's economy thrive.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <span className="feature-icon">🚀</span>
                            <h3 className="feature-title">Innovation Hub</h3>
                            <p className="feature-description">
                                Be part of Edmonton's growing tech scene. Connect with entrepreneurs, developers, and innovators shaping our city's future.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <span className="feature-icon">🎯</span>
                            <h3 className="feature-title">Personalized</h3>
                            <p className="feature-description">
                                Get recommendations tailored to your interests. Whether you love arts, sports, or food, discover what Edmonton has to offer you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    <h2 className="stats-title">Join Edmonton's Growing Digital Community</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">10K+</span>
                            <span className="stat-label">Community Members</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Local Events</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">Local Businesses</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Neighborhoods</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
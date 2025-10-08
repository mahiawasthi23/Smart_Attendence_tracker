import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Smart Attendance System</h1>
            <p className="subheading">Track Attendance Efficiently</p>
            <p className="description">
              QR-based attendance, kitchen duty management, leave requests & real-time reports
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Get Started</button>
              <button className="btn-outline">Login</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="gairl_with_qr.png" alt="Illustration" />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <img src="QR.png" alt="QR Icon" />
              <h3>QR-Based Attendance</h3>
              <p>Instant scan and auto mark present</p>
            </div>
            <div className="feature-card">
              <img src="google-docs.png" alt="Kitchen Icon" />
              <h3>Kitchen Duty Integration</h3>
              <p>Automatic duty marking without QR</p>
            </div>
            <div className="feature-card">
              <img src="document.png" alt="Leave Icon" />
              <h3>Leave Management</h3>
              <p>Apply, approve, and track leaves seamlessly</p>
            </div>
            <div className="feature-card">
              <img src="bar-graph.png" alt="Report Icon" />
              <h3>Reports & Dashboard</h3>
              <p>Track attendance percentage, history, and reports</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <img src="QR.png" alt="QR" />
              <p>Student scans QR for attendance</p>
            </div>
            <div className="arrow">➔</div>
            <div className="step">
              <img src="google-docs.png" alt="Duty" />
              <p>Select kitchen duty or apply leave</p>
            </div>
            <div className="arrow">➔</div>
            <div className="step">
              <img src="document.png" alt="Admin" />
              <p>Admin approves leaves and manages reports</p>
            </div>
            <div className="arrow">➔</div>
            <div className="step">
              <img src="bar-graph.png" alt="Summary" />
              <p>See attendance summary and history</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <div>
            <h2>Team</h2>
            <p>Building smarter attendance solutions for students</p>
          </div>
          <div className="team-members">
            <div className="member">
              <img src="mahima.jpeg" alt="Parvati" />
              <p>Parvati</p>
            </div>
            <div className="member">
              <img src="mahima.jpeg" alt="Mahima" />
              <p>Mahima</p>
            </div>
            <div className="member">
              <img src="mahima.jpeg" alt="Nasrina" />
              <p>Nasrina</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

import { Link } from "react-router";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              MERN STACK CRUD APPLICATION
            </div>

            <h1>
              Manage Your Users
              <span> Smarter.</span>
            </h1>

            <p className="hero-description">
              A modern full-stack user management application
              built with MongoDB, Express, React and Node.js.
            </p>

            <div className="hero-buttons">
              <Link to="/login" className="primary-button">
                Add Your First User
                <span>→</span>
              </Link>

              <Link to="/users" className="secondary-button">
                View Users
              </Link>
            </div>

            <div className="technology-row">
              <span>Built with</span>

              <div className="tech-item">
                <strong>M</strong>
                MongoDB
              </div>

              <div className="tech-item">
                <strong>E</strong>
                Express
              </div>

              <div className="tech-item">
                <strong>R</strong>
                React
              </div>

              <div className="tech-item">
                <strong>N</strong>
                Node
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-decoration decoration-one"></div>
            <div className="visual-decoration decoration-two"></div>

            <div className="dashboard-card">
              <div className="dashboard-header">
                <div>
                  <p>User Management</p>
                  <h3>Dashboard</h3>
                </div>

                <div className="online-badge">
                  <span></span>
                  Live
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">+</div>
                  <div>
                    <span>Create</span>
                    <strong>Users</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">✓</div>
                  <div>
                    <span>Manage</span>
                    <strong>Records</strong>
                  </div>
                </div>
              </div>

              <div className="sample-user-card">
                <div className="sample-avatar">BC</div>

                <div className="sample-details">
                  <strong>Bharani Chandar</strong>
                  <span>bharani@example.com</span>
                  <small>+91 98765 43210</small>
                </div>

                <div className="sample-actions">
                  <button className="sample-edit">Edit</button>
                  <button className="sample-delete">
                    Delete
                  </button>
                </div>
              </div>

              <div className="database-status">
                <div className="database-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div>
                  <strong>MongoDB Database</strong>
                  <p>Ready for connection</p>
                </div>

                <div className="status-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>WHAT YOU CAN DO</span>
          <h2>Complete CRUD Functionality</h2>
          <p>
            Everything needed to manage user records in one
            simple application.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <div className="feature-icon">+</div>
            <h3>Create</h3>
            <p>
              Add users with their name, phone number and
              email address.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">02</div>
            <div className="feature-icon">≡</div>
            <h3>Read</h3>
            <p>
              View all registered users through a clean,
              responsive interface.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">03</div>
            <div className="feature-icon">✎</div>
            <h3>Update</h3>
            <p>
              Edit existing user information whenever details
              need to be changed.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">04</div>
            <div className="feature-icon">×</div>
            <h3>Delete</h3>
            <p>
              Remove records safely with a confirmation step
              before deletion.
            </p>
          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="home-cta">
          <div>
            <span>READY TO START?</span>
            <h2>Add Your First User</h2>
          </div>

          <Link to="/login" className="cta-white-button">
            Get Started
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
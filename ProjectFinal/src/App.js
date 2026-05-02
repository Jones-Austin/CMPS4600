import React, { useState } from 'react';
import { Compass, Mountain, MapPin, History, Plus, TrendingUp, Calendar } from 'lucide-react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hikes, setHikes] = useState([
    { id: 1, name: 'Emerald Peak', distance: '5.2 mi', elevation: '1,200 ft', date: '2026-04-25', notes: 'Great views, bit windy at the top.' },
    { id: 2, name: 'Pine Valley Trail', distance: '3.8 mi', elevation: '450 ft', date: '2026-04-18', notes: 'Easy walk, lots of wildlife.' },
  ]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLogHike = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newHike = {
      id: Date.now(),
      name: formData.get('name'),
      distance: formData.get('distance') + ' mi',
      elevation: formData.get('elevation') + ' ft',
      date: new Date().toISOString().split('T')[0],
      notes: formData.get('notes')
    };
    setHikes([newHike, ...hikes]);
    toggleModal();
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="glass nav-bar">
        <div className="logo">
          <Mountain className="icon-primary" />
          <span>TrailBuddy</span>
        </div>
        <div className="nav-links">
          <Compass className="nav-icon active" />
          <History className="nav-icon" />
          <MapPin className="nav-icon" />
        </div>
      </nav>

      <main className="content">
        {/* Hero Stats */}
        <header className="hero animate-fade-in">
          <h1>Welcome back, Hiker</h1>
          <div className="stats-grid">
            <div className="stat-card glass">
              <TrendingUp className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Total Distance</span>
                <span className="stat-value">24.5 mi</span>
              </div>
            </div>
            <div className="stat-card glass">
              <Mountain className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Elevation Gain</span>
                <span className="stat-value">4,850 ft</span>
              </div>
            </div>
            <div className="stat-card glass">
              <Calendar className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Hikes This Month</span>
                <span className="stat-value">6</span>
              </div>
            </div>
          </div>
        </header>

        {/* Recent Activity */}
        <section className="recent-activity animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="text-button">View All</button>
          </div>
          <div className="activity-list">
            {hikes.map(hike => (
              <div key={hike.id} className="hike-card glass">
                <div className="hike-info">
                  <h3>{hike.name}</h3>
                  <p className="hike-meta">
                    <span>{hike.date}</span> • <span>{hike.distance}</span>
                  </p>
                  <p className="hike-notes">{hike.notes}</p>
                </div>
                <div className="hike-stats">
                  <div className="mini-stat">
                    <TrendingUp size={14} /> {hike.elevation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fab" onClick={toggleModal}>
        <Plus size={24} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content glass animate-fade-in" onClick={e => e.stopPropagation()}>
            <h2>Log New Hike</h2>
            <form onSubmit={handleLogHike}>
              <div className="form-group">
                <label>Trail Name</label>
                <input name="name" type="text" placeholder="e.g. Blue Ridge Trail" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Distance (mi)</label>
                  <input name="distance" type="number" step="0.1" placeholder="5.0" required />
                </div>
                <div className="form-group">
                  <label>Elevation (ft)</label>
                  <input name="elevation" type="number" placeholder="1200" required />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea name="notes" placeholder="How was the trail?"></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="text-button" onClick={toggleModal}>Cancel</button>
                <button type="submit" className="primary-button">Save Hike</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

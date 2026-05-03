import React, { useState, useEffect, useMemo } from 'react';
import { Compass, Mountain, MapPin, History, Plus, TrendingUp, Calendar, Star, Cloud, Sun, CloudRain, Wind } from 'lucide-react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hikes, setHikes] = useState([
    { id: 1, name: 'Emerald Peak', distance: 5.2, elevation: 1200, date: '2026-04-25', notes: 'Great views, bit windy at the top.', difficulty: 'Hard', rating: 5 },
    { id: 2, name: 'Pine Valley Trail', distance: 3.8, elevation: 450, date: '2026-04-18', notes: 'Easy walk, lots of wildlife.', difficulty: 'Easy', rating: 4 },
  ]);

  const [weather, setWeather] = useState({
    temp: '--',
    condition: 'Loading...',
    location: 'Detecting...',
    icon: <Cloud className="weather-icon animate-pulse" />
  });

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
        );
        const data = await response.json();
        
        const code = data.current.weather_code;
        let condition = 'Clear';
        let icon = <Sun className="weather-icon" />;

        if (code === 0) {
          condition = 'Clear Sky';
          icon = <Sun className="weather-icon" />;
        } else if (code >= 1 && code <= 3) {
          condition = 'Partly Cloudy';
          icon = <Cloud className="weather-icon" />;
        } else if (code >= 51 && code <= 67) {
          condition = 'Rainy';
          icon = <CloudRain className="weather-icon" />;
        } else if (code >= 80) {
          condition = 'Showers';
          icon = <CloudRain className="weather-icon" />;
        } else {
          condition = 'Cloudy';
          icon = <Cloud className="weather-icon" />;
        }

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: condition,
          location: 'Your Region',
          icon: icon
        });
      } catch (error) {
        console.error("Weather fetch failed:", error);
        setWeather(prev => ({ ...prev, condition: 'Offline', location: 'Check Connection' }));
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback if user denies location
          fetchWeather(40.7128, -74.0060); // Default to NYC
          setWeather(prev => ({ ...prev, location: 'New York (Default)' }));
        }
      );
    }
  }, []);


  const stats = useMemo(() => {
    const totalDist = hikes.reduce((acc, hike) => acc + parseFloat(hike.distance), 0);
    const totalElev = hikes.reduce((acc, hike) => acc + parseInt(hike.elevation), 0);
    
    const now = new Date();
    const thisMonth = hikes.filter(hike => {
      const hikeDate = new Date(hike.date);
      return hikeDate.getMonth() === now.getMonth() && hikeDate.getFullYear() === now.getFullYear();
    }).length;

    return {
      distance: totalDist.toFixed(1),
      elevation: totalElev.toLocaleString(),
      count: thisMonth
    };
  }, [hikes]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLogHike = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newHike = {
      id: Date.now(),
      name: formData.get('name'),
      distance: parseFloat(formData.get('distance')),
      elevation: parseInt(formData.get('elevation')),
      difficulty: formData.get('difficulty'),
      rating: parseInt(formData.get('rating')),
      date: new Date().toISOString().split('T')[0],
      notes: formData.get('notes')
    };
    setHikes([newHike, ...hikes]);
    toggleModal();
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={12} fill={i < rating ? "var(--secondary)" : "none"} color={i < rating ? "var(--secondary)" : "var(--text-muted)"} />
    ));
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
        {/* Weather Feature */}
        <section className="weather-section animate-fade-in">
          <div className="weather-card glass">
            <div className="weather-main">
              {weather.icon}
              <div className="weather-info">
                <span className="temp">{weather.temp}°F</span>
                <span className="condition">{weather.condition}</span>
              </div>
            </div>
            <div className="weather-meta">
              <span className="location"><MapPin size={14} /> {weather.location}</span>
              <span className="recommendation">Perfect day for a hike!</span>
            </div>
          </div>
        </section>

        {/* Hero Stats */}
        <header className="hero animate-fade-in">
          <h1>Welcome back, Hiker</h1>
          <div className="stats-grid">
            <div className="stat-card glass">
              <TrendingUp className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Total Distance</span>
                <span className="stat-value">{stats.distance} mi</span>
              </div>
            </div>
            <div className="stat-card glass">
              <Mountain className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Elevation Gain</span>
                <span className="stat-value">{stats.elevation} ft</span>
              </div>
            </div>
            <div className="stat-card glass">
              <Calendar className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Hikes This Month</span>
                <span className="stat-value">{stats.count}</span>
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
                  <div className="hike-title-row">
                    <h3>{hike.name}</h3>
                    <span className={`badge ${hike.difficulty.toLowerCase()}`}>{hike.difficulty}</span>
                  </div>
                  <p className="hike-meta">
                    <span>{hike.date}</span> • <span>{hike.distance} mi</span> • <span className="stars">{renderStars(hike.rating)}</span>
                  </p>
                  <p className="hike-notes">{hike.notes}</p>
                </div>
                <div className="hike-stats">
                  <div className="mini-stat">
                    <TrendingUp size={14} /> {hike.elevation} ft
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
              <div className="form-row">
                <div className="form-group">
                  <label>Difficulty</label>
                  <select name="difficulty" className="glass-input">
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <input name="rating" type="number" min="1" max="5" defaultValue="5" required />
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


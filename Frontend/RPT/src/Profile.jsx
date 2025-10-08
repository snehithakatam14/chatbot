import { useEffect } from 'react';
import { useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('http://localhost:3000/profile', {
          method: 'GET',
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Unauthorized or server error`);
        }

        const data = await res.json();
        setProfile(data.user);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setProfile(null);
      }
    }
    fetchProfile();
  },[])

  return (
    <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>User Profile</h2>

      <div style={{ marginTop: '20px' }}>
        {error && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            ⚠️ Error: {error}
          </p>
        )}

        {profile ? (
          <div style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            textAlign: 'left'
          }}>
            <p style={{ margin: '0 0 10px', color: '#333' }}>
              📧 <strong>Email:</strong> {profile.email}
            </p>
            <p style={{ margin: 0, color: '#333' }}>
              🏆 <strong>Score:</strong> {profile.score}
            </p>
          </div>
        ) : (
          !error && <p style={{ color: '#555' }}>No profile loaded</p>
        )}
      </div>
    </div>
  );
}
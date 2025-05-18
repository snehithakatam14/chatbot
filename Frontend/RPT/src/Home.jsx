import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch('http://localhost:3000/me', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setLoggedIn(data.loggedIn); // true or false expected
      } catch (err) {
        console.error('Failed to fetch login status:', err);
        setLoggedIn(false); // fallback to false
      }
    }

    checkLogin();
  }, []);

  return (
    <div
      className="container text-center mt-5 p-5"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        className="mb-3"
        style={{ color: '#0d6efd', fontWeight: '700' }}
        data-aos="fade-down"
      >
        Welcome to RPT
      </h1>

      <p
        className="lead mb-4"
        style={{ color: '#444', fontSize: '1.2rem', lineHeight: '1.6' }}
        data-aos="fade-up"
      >
        <strong>RPT</strong> is an advanced AI-powered assistant built on cutting-edge GPT technology. It’s designed to help you by answering your questions, explaining complex topics in simple terms, generating creative content, and boosting your productivity — all in real time.
      </p>

      <p
        className="mb-4"
        style={{ color: '#555', fontSize: '1rem', lineHeight: '1.5' }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Whether you’re a student tackling tough subjects, a developer looking for quick solutions, a writer seeking inspiration, or simply curious about the world — RPT is here to empower your learning, creativity, and daily workflow.
      </p>

      <img
        src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
        alt="AI Assistant Icon"
        width="120"
        height="120"
        className="mb-4"
        data-aos="zoom-in"
        data-aos-delay="400"
      />

      {/* Only show login/register if not logged in */}
      {!loggedIn && (
        <div className="d-flex justify-content-center gap-3 mt-3" data-aos="fade-up" data-aos-delay="500">
          <Link
            to="/login"
            className="btn btn-outline-primary px-4 fw-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-primary px-4 fw-semibold"
          >
            Register
          </Link>
        </div>
      )}
      {loggedIn && (
        <div className="d-flex justify-content-center gap-3 mt-3" data-aos="fade-up" data-aos-delay="500">
          <Link
            to="/rpt"
            className="btn btn-outline-primary px-4 fw-semibold"
          >
            Ask RPT
          </Link>
          <Link
            to="/history"
            className="btn btn-primary px-4 fw-semibold"
          >
          View History
          </Link>
        </div>
      )}

      <hr className="my-4" />

      <div
        className="mt-4"
        style={{ color: '#333', fontSize: '1rem', lineHeight: '1.6' }}
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>About Me</h3>
        <p>
          Hi, I’m Rushil Reddy Gujjula — a passionate web developer and AI enthusiast dedicated to creating innovative digital solutions. I’m always exploring new technologies to build smarter, user-friendly apps like RPT.
        </p>

        <a
          href="https://www.linkedin.com/in/rushil-reddy-gujjula-12212a284/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '10px',
            color: '#0a66c2',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#004182')}
          onMouseLeave={e => (e.currentTarget.style.color = '#0a66c2')}
        >
          Connect with me on LinkedIn &rarr;
        </a>
      </div>

      <hr className="my-4" />

      <Outlet />
    </div>
  );
}

export default Home;
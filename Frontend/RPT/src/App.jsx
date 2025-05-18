import { Link, Outlet} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch('http://localhost:3000/me', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setLoggedIn(data.loggedIn);
      } catch (err) {
        console.error('Failed to fetch login status:', err);
        setLoggedIn(true);
      }
    }

    checkLogin();
  }, []);

  async function logout() {
    try {
      const res = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      console.log(res)
      setLoggedIn(false);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4 text-warning" to="/">
<img src="../image.png" alt="image" className="small-icon" />
<span>RPT-(G)PT</span>          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {loggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/history" className="nav-link text-light fw-semibold">
                      History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/rpt" className="nav-link text-light fw-semibold">
                      Ask RPT
                    </Link>
                  </li>
                </>
              )}
              {!loggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-light fw-semibold">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link text-light fw-semibold">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {loggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-light fw-semibold" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link text-light fw-semibold">
                      Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container flex-grow-1 my-4">
        <Outlet />
      </div>

      <footer className="bg-dark text-light" style={{ padding: '8px 0', fontSize: '0.75rem' }}>
        <div className="container text-md-left">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto">
              <h5 className="text-uppercase mb-1 fw-bold text-warning" style={{ fontSize: '0.85rem' }}>
                RPT
              </h5>
              <p style={{ marginBottom: 0, fontSize: '0.7rem' }}>
                RPT is your personalized GPT-powered assistant for generating instant, intelligent responses to any prompt.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
              <h5 className="text-uppercase mb-1 fw-bold text-warning" style={{ fontSize: '0.85rem' }}>
                Links
              </h5>
              <p className="mb-0"><a href="home" className="text-light text-decoration-none" style={{ fontSize: '0.7rem' }}>Home</a></p>
              <p className="mb-0"><a href="register" className="text-light text-decoration-none" style={{ fontSize: '0.7rem' }}>Register</a></p>
              <p className="mb-0"><a href="login" className="text-light text-decoration-none" style={{ fontSize: '0.7rem' }}>Login</a></p>
              <p className="mb-0"><a href="https://www.linkedin.com/in/rushil-reddy-gujjula-12212a284" target='_blank' className="text-light text-decoration-none" style={{ fontSize: '0.7rem' }}>Contact</a></p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto">
              <h5 className="mb-1 fw-bold text-warning" style={{ fontSize: '0.85rem' }}>Contact</h5>
              <p className="mb-0" style={{ fontSize: '0.7rem' }}><i className="bi bi-house-door-fill me-2"></i>Hyderabad, 500059</p>
              <p className="mb-0" style={{ fontSize: '0.7rem' }}><i className="bi bi-envelope-fill me-2"></i>grushilreddy2004@gmail.com</p>
              <p className="mb-0" style={{ fontSize: '0.7rem' }}><i className="bi bi-telephone-fill me-2"></i>+91 7013650345</p>
            </div>
          </div>
          <hr className="my-1" />
          <div className="row align-items-center">
            <div className="col-md-7 col-lg-8">
              <p className="mb-0" style={{ fontSize: '0.65rem' }}>
                © {new Date().getFullYear()} YourApp. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-5 col-lg-4 text-center text-md-end">
              <a href="#" className="text-light me-2" style={{ fontSize: '0.9rem' }}><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light me-2" style={{ fontSize: '0.9rem' }}><i className="bi bi-instagram"></i></a>
              <a href="https://www.linkedin.com/in/rushil-reddy-gujjula-12212a284" className="text-light me-2" style={{ fontSize: '0.9rem' }}><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
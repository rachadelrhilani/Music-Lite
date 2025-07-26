import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand fw-bold" to="/">
         🎵 Music Lite
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Recherche🔍</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favoris❤️</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/playlists">Playlists</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


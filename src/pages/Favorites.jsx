// src/pages/Favorites.jsx
import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import MusicCard from '../components/MusicCard';

const Favorites = () => {
  const { favorites } = useContext(MusicContext);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🎵 Musiques Favorisées</h2>

      {favorites.length === 0 ? (
        <p className="text-muted">Aucune musique favorisée pour le moment.</p>
      ) : (
        <div className="row">
          {favorites.map((track, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <MusicCard track={track} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

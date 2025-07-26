import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';

const Playlists = () => {
  const { playlists, removeFromPlaylist, deletePlaylist } = useContext(MusicContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  const playlistNames = Object.keys(playlists || {});
  const tracks = playlists[selectedPlaylist] || [];

  const handleDeletePlaylist = () => {
    if (
      window.confirm(
        `Voulez-vous supprimer complètement la playlist "${selectedPlaylist}" ?`
      )
    ) {
      deletePlaylist(selectedPlaylist);
      setSelectedPlaylist('');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">🎵 Vos Playlists</h2>

      {playlistNames.length === 0 && (
        <p className="text-center mt-3 text-muted">
          Aucune playlist créée pour l'instant.
        </p>
      )}

      {playlistNames.length > 0 && (
        <>
          <div className="mb-3">
            <label htmlFor="playlist-select" className="form-label">
              Choisir une playlist
            </label>
            <select
              className="form-select"
              id="playlist-select"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
              <option value="">-- Sélectionner --</option>
              {playlistNames.map((name) => (
                <option key={name} value={name}>
                  {name} ({playlists[name]?.length || 0})
                </option>
              ))}
            </select>
          </div>

          {selectedPlaylist && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Playlist : {selectedPlaylist}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDeletePlaylist}
                >
                  🗑 Supprimer la playlist
                </button>
              </div>

              {tracks.length === 0 ? (
                <p className="text-center mt-3 text-muted">
                  Cette playlist est vide.
                </p>
              ) : (
                <div className="row">
                  {tracks.map((track, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                      <div className="card h-100">
                        <img
                          src={
                            track.image?.[2]?.['#text'] ||
                            'https://via.placeholder.com/150'
                          }
                          className="card-img-top"
                          alt={track.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{track.name}</h5>
                          <p className="card-text">👤 {track.artist.name}</p>
                          <button
                            className="btn mt-2 btn-sm btn-outline-danger"
                            onClick={() =>
                              removeFromPlaylist(selectedPlaylist, track)
                            }
                          >
                            ❌ Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Playlists;

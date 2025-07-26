import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';

const MusicCard = ({ track }) => {
  const { toggleFavorite, favorites, playlists, addToPlaylist } = useContext(MusicContext);

  const [selectValue, setSelectValue] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const isFavorite = favorites.some((t) => t.name === track.name);
  const playlistOptions = Object.keys(playlists);

  const handleAddToPlaylist = () => {
    const name = selectValue === '__new' ? newPlaylistName.trim() : selectValue;

    if (!name) return alert("Veuillez entrer un nom de playlist valide.");
    addToPlaylist(name, track);
    alert(`Ajouté à la playlist "${name}"`);

    setSelectValue('');
    setNewPlaylistName('');
  };

  return (
    <div className="card h-100">
      <img
        src={track.image?.[2]?.['#text'] || 'https://via.placeholder.com/150'}
        className="card-img-top"
        alt={track.name}
      />
      <div className="card-body">
        <h5 className="card-title">{track.name}</h5>
        <p className="card-text text-muted">👤 {track.artist.name}</p>

        <button
          className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-primary'} mb-2`}
          onClick={() => toggleFavorite(track)}
        >
          {isFavorite ? '❤️ Supprimer' : '🤍 Favoriser'}
        </button>

        <div className="input-group">
          <select
            className="form-select"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="">🎵 Choisir une playlist</option>
            {playlistOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
            <option value="__new">➕ Nouvelle playlist</option>
          </select>

          {selectValue === '__new' && (
            <input
              type="text"
              className="form-control"
              placeholder="Nom de la nouvelle playlist"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
          )}

          <button className="btn btn-success" onClick={handleAddToPlaylist}>
            ➕ Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;

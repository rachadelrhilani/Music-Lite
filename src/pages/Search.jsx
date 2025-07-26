import React, { useState} from "react";
import MusicCard from "../components/MusicCard";

const API_KEY = process.env.REACT_APP_API_KEY; 

const Search = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(
          query
        )}&api_key=${API_KEY}&format=json`
      );
      const data = await response.json();

      // Extraire les résultats
      const foundTracks = data.results.trackmatches.track || [];
      setTracks(foundTracks);
    } catch (error) {
      console.error("Erreur de recherche:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">🔍 Recherche de musiques</h2>

      {/* Formulaire de recherche */}
      <form className="input-group mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          placeholder="Entrez un titre ou un artiste..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Rechercher
        </button>
      </form>

      {loading && <p className="text-center">Chargement...</p>}

      {/* Résultats */}
      <div className="row">
        {tracks.length > 0 &&
          tracks.map((track, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <MusicCard
                track={{
                  ...track,
                  artist: { name: track.artist }, // uniformiser structure
                  image: track.image,
                }}
              />
            </div>
          ))}
      </div>

      {!loading && tracks.length === 0 && (
        <p className="text-center text-muted">
          Faites une recherche pour voir les résultats
        </p>
      )}
    </div>
  );
};

export default Search;

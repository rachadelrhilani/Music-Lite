import { createContext, useState, useEffect } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState({});
  const [isLoaded, setIsLoaded] = useState(false); // nouveau flag

  const getUniqueKey = (track) => {
    const artistName =
      typeof track.artist === 'string'
        ? track.artist
        : track.artist?.name || 'unknown';
    return track.mbid || `${track.name}-${artistName}`;
  };

  // CHARGEMENT initial depuis localStorage
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      let storedPlaylists = JSON.parse(localStorage.getItem('playlists'));

      if (!storedPlaylists || typeof storedPlaylists !== 'object' || Array.isArray(storedPlaylists)) {
        storedPlaylists = {};
      }

      setFavorites(storedFavorites);
      setPlaylists(storedPlaylists);
    } catch (err) {
      console.error("❌ Erreur de chargement localStorage:", err);
    } finally {
      setIsLoaded(true); // le chargement est fini
    }
  }, []);

  // SAUVEGARDE automatique uniquement après chargement
  useEffect(() => {
    if (!isLoaded) return; // n'écrit rien avant la fin du premier chargement
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [favorites, playlists, isLoaded]);

  const toggleFavorite = (track) => {
    const key = getUniqueKey(track);
    const exists = favorites.some((t) => getUniqueKey(t) === key);

    if (exists) {
      setFavorites(favorites.filter((t) => getUniqueKey(t) !== key));
    } else {
      setFavorites([
        ...favorites,
        {
          mbid: track.mbid || null,
          name: track.name,
          artist: {
            name: typeof track.artist === 'string' ? track.artist : track.artist?.name || 'unknown',
          },
          image: track.image || [],
        },
      ]);
    }
  };

  const addToPlaylist = (playlistName, track) => {
    if (!playlistName || !track) return;
    const current = { ...playlists };
    const list = current[playlistName] || [];
    const exists = list.some((t) => getUniqueKey(t) === getUniqueKey(track));
    if (!exists) {
      setPlaylists({
        ...current,
        [playlistName]: [...list, track],
      });
    }
  };

  const removeFromPlaylist = (playlistName, track) => {
    const current = { ...playlists };
    const list = current[playlistName] || [];
    const updated = list.filter((t) => getUniqueKey(t) !== getUniqueKey(track));
    setPlaylists({
      ...current,
      [playlistName]: updated,
    });
  };

  const deletePlaylist = (playlistName) => {
  const updatedPlaylists = { ...playlists };
  delete updatedPlaylists[playlistName];
  setPlaylists(updatedPlaylists);
};
  return (
    <MusicContext.Provider
      value={{
        favorites,
        toggleFavorite,
        playlists,
        addToPlaylist,
        removeFromPlaylist,
        deletePlaylist
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

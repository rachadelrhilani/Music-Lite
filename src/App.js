import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext.jsx';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Playlists from './pages/Playlists';
import Navbar from './components/Navbar';

function App() {
  return (
    <MusicProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </Router>
    </MusicProvider>
  );
}

export default App;

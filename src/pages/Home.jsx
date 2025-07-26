import { useEffect, useState } from 'react';
import axios from 'axios';
import MusicCard from '../components/MusicCard';

const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        axios
            .get(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json`)
            .then((res) => {
                setTracks(res.data.tracks.track);
            })
            .catch((err) => console.error('Erreur API:', err));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Top Tracks</h2>
            <div className="row">
                {tracks.map((track) => (
                    <div className="col-md-3 mb-3" key={track.id}>
                        <MusicCard track={track} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

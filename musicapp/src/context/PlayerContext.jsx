import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'https://beat-flow-app.onrender.com';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [loop, setLoop] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const toggleShuffle = () => setShuffle(!shuffle);
    const toggleLoop = () => setLoop(!loop);

    const playWithId = async (id) => {
        const selectedTrack = songsData.find((item) => item._id === id);
        if (selectedTrack) setTrack(selectedTrack);
        setPlayStatus(true);
    };

    const previous = () => {
        const currentIndex = songsData.findIndex((item) => item._id === track._id);
        if (currentIndex > 0) setTrack(songsData[currentIndex - 1]);
    };

    const next = () => {
        const currentIndex = songsData.findIndex((item) => item._id === track._id);
        
        // Shuffle or Loop Logic
        if (shuffle) {
            const randomIndex = Math.floor(Math.random() * songsData.length);
            setTrack(songsData[randomIndex]);
        } else if (loop && currentIndex === songsData.length - 1) {
            setTrack(songsData[0]);  // Loop back to the start
        } else if (currentIndex < songsData.length - 1) {
            setTrack(songsData[currentIndex + 1]);  // Go to next song
        }
    };

    const seekSong = (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };

    // Auto-play the track if `track` changes and `playStatus` is true
    useEffect(() => {
        if (track && playStatus) {
            audioRef.current.play();
        }
    }, [track, playStatus]);

    // Automatically move to the next track when the current track ends
    useEffect(() => {
        const handleEnded = () => {
            if (loop) {
                play(); // Replay the current track
            } else {
                next(); // Go to the next track
            }
        };

        if (audioRef.current) {
            audioRef.current.addEventListener("ended", handleEnded);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("ended", handleEnded);
            }
        };
    }, [track, loop, shuffle]);

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current) {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData, albumsData,
        shuffle, loop,
        toggleShuffle, toggleLoop
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;

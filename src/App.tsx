import "./App.css";
import { useState } from "react";

import { useEffect } from "react";
import { Api } from "./api";
import { MusicInfo } from "./dto/MusicInfo";
import MusicCard from "./components/MusicCard";

export default () => {
  const [musics, setMusics] = useState<MusicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMusic, setCurrentMusic] = useState<MusicInfo | null>(null);
  const fetchMusicInfo = async () => {
    setLoading(true);
    const infos = await Api.fetchMusicInfo();
    setMusics(infos);
    setLoading(false);
  };

  useEffect(() => {
    fetchMusicInfo();
  }, []);

  return (
    <div className="App">
      <h1>Music List</h1>
      {loading && <p>Loading...</p>}
      {musics.map((info) => (
        <p
          key={info.id}
          onClick={() => setCurrentMusic(info)}
          className={`TrackItem ${
            currentMusic?.id === info.id ? "current" : ""
          }`}
        >
          {info.name}
        </p>
      ))}
      <h3>Player</h3>
      {currentMusic && (
        <MusicCard key={currentMusic.id} {...currentMusic} />
      )}
    </div>
  );
};

import { useState } from "react";

import { useEffect } from "react";
import { MockApi } from "./service/mockApi";
import { MusicRecord } from "./dto";
import Header from "./components/Header";
import MusicCardList from "./components/MusicCardList";
import MusicPlayerModal from "./components/MusicPlayerModal";

export default () => {
  const [musics, setMusics] = useState<MusicRecord[]>([]);

  const [loading, setLoading] = useState(true);
  const [currentMusic, setCurrentMusic] = useState<MusicRecord | null>(null);
  const fetchMusicInfo = async () => {
    setLoading(true);
    const infos = await MockApi.fetchMusicRecords();
    setMusics(infos);
    setLoading(false);
  };

  useEffect(() => {
    fetchMusicInfo();
  }, []);

  const onMusicSelected = (music: MusicRecord | null) => {
    console.log("Selected music", music);
    setCurrentMusic(music);
  };

  return (
    <>
      <main>
        <Header title="Super player"></Header>
      </main>
      {loading && <p>Loading...</p>}
      <MusicCardList cards={musics} onSelectedMusic={onMusicSelected} />
      {currentMusic && (
        <MusicPlayerModal
          activeMusic={currentMusic}
          onExit={() => onMusicSelected(null)}
        />
      )}
    </>
  );
};

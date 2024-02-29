import "./MainPage.scss";

import React from "react";
import { MockApi } from "@/service/mockApi";
import { MusicRecord } from "@/dto";
import Header from "@/components/main/Header";
import MusicCardList from "@/components/common/MusicCardList";
import MusicPlayerPanel from "@/components/common/MusicPlayerPanel";
const MainPage: React.FC = () => {
  const [musics, setMusics] = React.useState<MusicRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentMusic, setCurrentMusic] = React.useState<MusicRecord | null>(
    null
  );
  const fetchMusicInfo = async () => {
    setLoading(true);
    const infos = await MockApi.fetchMusicRecords();
    setMusics(infos);
    setLoading(false);
    setCurrentMusic(infos[0]);
  };

  React.useEffect(() => {
    fetchMusicInfo();
  }, []);

  const onMusicSelected = (music: MusicRecord | null) => {
    console.log("Selected music", music);
    setCurrentMusic(music);
  };

  const listBlock = loading ? (
    <p>Loading...</p>
  ) : (
    <MusicCardList cards={musics} onSelectedMusic={onMusicSelected} selectedId={currentMusic?.id || null} />
  );

  return (
    <main className="MainPage">
      <Header title="Super player"></Header>
      {listBlock}
      {currentMusic && <MusicPlayerPanel activeMusic={currentMusic} />}
    </main>
  );
};

export default MainPage;

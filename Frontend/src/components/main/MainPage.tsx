import "./MainPage.scss";

import React from "react";
import { Api } from "@/service/api";
import { MusicRecord } from "@/dto";
import Header from "@/components/main/Header";
import MusicCardList from "@/components/common/MusicCardList";
import MusicPlayerPanel from "@/components/common/MusicPlayerPanel";

const PageLoading: React.FC = () => {
  return <p>Loading...</p>;
};

const MainPage: React.FC = () => {
  const [musicId, setMusicId] = React.useState<string | null>(null);
  const { data: tracks, isLoading, refetch } = Api.useTracks();
  const onMusicSelected = (music: MusicRecord | null) => {
    console.log("Selected music", music);
    setMusicId(music?.id || null);
  };

  React.useEffect(() => {
    const interval = setInterval(() => refetch(), 5000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  const hasMusic = !isLoading && tracks != null;
  const activeMusic = tracks?.find((track) => track.id === musicId) || null;

  const currentIndex = tracks?.findIndex((track) => track.id === musicId) || 0;
  const nextMusic = tracks?.[currentIndex + 1] || tracks?.[0] || null;
  const previousMusic = tracks?.[currentIndex - 1] || tracks?.[tracks.length - 1] || null;




  navigator.mediaSession.setActionHandler('nexttrack', () => {
    setMusicId(nextMusic?.id || null);
  });

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    setMusicId(previousMusic?.id || null);
  });

  const listBlock = hasMusic ? (
    <MusicCardList
      cards={tracks}
      onSelectedMusic={onMusicSelected}
      selectedId={musicId}
    />
  ) : (
    <PageLoading />
  );

  return (
    <main className="MainPage">
      <Header title="Super player"></Header>
      {listBlock}
      {activeMusic && <MusicPlayerPanel activeMusic={activeMusic}  />}
    </main>
  );
};

export default MainPage;

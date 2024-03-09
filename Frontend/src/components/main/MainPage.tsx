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
  const { data: tracks, isLoading } = Api.useTracks();

  const onMusicSelected = (music: MusicRecord | null) => {
    console.log("Selected music", music);
    setMusicId(music?.id || null);
  };

  const hasMusic = !isLoading && tracks != null && tracks.length > 0;
  const activeMusic = tracks?.find((track) => track.id === musicId) || null;

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
      {activeMusic && <MusicPlayerPanel activeMusic={activeMusic} />}
    </main>
  );
};

export default MainPage;

import "./MainPage.scss";

import React from "react";
import { Api } from "@/service/api";
import MusicCardList from "@/components/common/MusicCardList";
import MusicPlayerPanel from "@/components/common/MusicPlayerPanel";
import Loading from "@/components/common/Loading";
import HistoryList from "@/components/common/HistoryList";
import Header from "@/components/common/Header";
import { useMusicPlayer } from "@/service/playerStore";

const MainPage: React.FC = () => {
  const player = useMusicPlayer();
  const { data: tracks } = Api.useTracks();
  React.useEffect(() => tracks && player.setTracks(tracks), [tracks]);
  const currentTrackId = player.currentTrackId;
  const currentTrack = tracks?.find((track) => track.id === currentTrackId) || null;
  return (
    <main className="MainPage">
      <div className="MainPage__pages section">
        <Header />
      </div>
      <div className="MainPage__history section">
        <h1>History</h1>
        <HistoryList />
      </div>
      <div className="MainPage__content section">
        <h1>Trending music</h1>
        <React.Suspense fallback={<Loading />}>
          <MusicCardList />
        </React.Suspense>
      </div>
      <div className="MainPage__player section">
        {currentTrack && <MusicPlayerPanel activeMusic={currentTrack} />}
      </div>
    </main>
  );
};

export default MainPage;

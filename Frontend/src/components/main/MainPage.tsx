import "./MainPage.scss";

import React from "react";
import { Api } from "@/service/api";
import MusicCardList from "@/components/common/MusicCardList";
import MusicPlayerPanel from "@/components/common/MusicPlayerPanel";
import Loading from "@/components/common/Loading";

const MainPage: React.FC = () => {
  const [musicId, setMusicId] = React.useState<string | null>(null);
  const { status, data: tracks } = Api.useTracks();

  const activeMusic = tracks?.find((track) => track.id === musicId) || null;
  return (
    <main className="MainPage">
      <div className="MainPage__pages section">
        <header>
          <h1>PVQ Player</h1>
        </header>
      </div>
      <div className="MainPage__history section">history {status}</div>
      <div className="MainPage__content section">
        <h1>Trending music</h1>
        <React.Suspense fallback={<Loading />}>
          <MusicCardList selectedId={musicId} onSelect={setMusicId} />
        </React.Suspense>
      </div>
      <div className="MainPage__player section">
        {activeMusic && <MusicPlayerPanel activeMusic={activeMusic} />}
      </div>
    </main>
  );
};

export default MainPage;

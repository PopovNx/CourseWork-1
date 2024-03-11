import "./MainPage.scss";

import React from "react";
import { Api } from "@/service/api";
import MusicCardList from "@/components/common/MusicCardList";
import MusicPlayerPanel from "@/components/common/MusicPlayerPanel";
import Loading from "@/components/common/Loading";
import { useLocalStorage } from "@uidotdev/usehooks";
import { HistoryRecord } from "@/dto/HistoryRecord";
import moment from "moment";
import HistoryList from "@/components/common/HistoryList";
import Header from "@/components/common/Header";

const MainPage: React.FC = () => {
  const [history, setHistory] = useLocalStorage<HistoryRecord[]>("history", []);
  const [musicId, setMusicId] = React.useState<string | null>(null);
  const { data: tracks } = Api.useTracks();

  const addHistory = (id: string) => {
    setHistory((prev) => {
      const first = prev[0] || null;
      if (first && first.id === id) return prev;
      const newRecord: HistoryRecord = {
        id,
        title: tracks?.find((track) => track.id === id)?.title || "",
        timeUnix: moment().unix(),
      };
      return [newRecord, ...prev];
    });
    console.log(history);
  };

  const handleMusicChange = (id: string) => {
    setMusicId(id);
    addHistory(id);
  };

  const activeMusic = tracks?.find((track) => track.id === musicId) || null;
  return (
    <main className="MainPage">
      <div className="MainPage__pages section">
        <Header />
      </div>
      <div className="MainPage__history section">
        <h1>History</h1>
        <HistoryList history={history} onSelect={handleMusicChange} />
      </div>
      <div className="MainPage__content section">
        <h1>Trending music</h1>
        <React.Suspense fallback={<Loading />}>
          <MusicCardList selectedId={musicId} onSelect={handleMusicChange} />
        </React.Suspense>
      </div>
      <div className="MainPage__player section">
        {activeMusic && <MusicPlayerPanel activeMusic={activeMusic} />}
      </div>
    </main>
  );
};

export default MainPage;

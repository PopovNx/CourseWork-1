import "./MusicCardList.scss";
import MusicCard from "@/components/common/MusicCard";
import { Api } from "@/service/api";
import { useMusicPlayer } from "@/service/playerStore";


const MusicCardList: React.FC = () => {
  Api.useTracksSuspense();
  const tracks = useMusicPlayer((state) => state.tracks);
  const currentTrackId = useMusicPlayer((state) => state.currentTrackId);
  const isPlaying = useMusicPlayer((state) => state.playing);
  const cardList = tracks.map((record) => (
    <MusicCard
      key={record.id}
      record={record}
      isSelected={record.id === currentTrackId}
      isPlaying={isPlaying && record.id === currentTrackId}
    />
  ));
  return <div className="MusicCardList">{cardList}</div>;
};

export default MusicCardList;

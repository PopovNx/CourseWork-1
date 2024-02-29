import { MockApi } from "@/service/mockApi";
import "./MusicCard.scss";
import { MusicRecord } from "@/dto";

interface MusicCardProps {
  record: MusicRecord;
  onSelected?: (record: MusicRecord) => void;
  isPlaying?: boolean;
}

const MusicCard: React.FC<MusicCardProps> = ({ record, onSelected, isPlaying }) => {
  const posterUrl = MockApi.resolveMusicCover(record.id);
  const playingClass = isPlaying ? "playing" : "";
  
  return (
    <div className={`MusicCard ${playingClass}`} onClick={() => onSelected && onSelected(record)}>
      <p>{record.duration}</p>
      <div className="img-wapper">
        <img src={posterUrl} alt={record.title} />
      </div>
      <p>{record.title}</p>
    </div>
  );
};

export default MusicCard;

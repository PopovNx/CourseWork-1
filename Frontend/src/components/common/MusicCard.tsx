import { Api } from "@/service/api";
import "./MusicCard.scss";
import { MusicRecord } from "@/dto";
import moment from "moment";

interface MusicCardProps {
  record: MusicRecord;
  onSelected?: (record: MusicRecord) => void;
  isPlaying?: boolean;
}

const MusicCard: React.FC<MusicCardProps> = ({ record, onSelected, isPlaying }) => {
  const posterUrl = Api.resolvePosterUrl(record.id);
  const playingClass = isPlaying ? "playing" : "";
  const duration = moment.utc(record.duration * 1000).format("mm:ss");
  return (
    <div className={`MusicCard ${playingClass}`} onClick={() => onSelected && onSelected(record)}>
      <p>{duration}</p>
      <div className="img-wapper">
        <img src={posterUrl} alt={record.title} />
      </div>
      <p>{record.title}</p>
    </div>
  );
};

export default MusicCard;

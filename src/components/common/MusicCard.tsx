import "./MusicCard.scss";
import { MusicRecord } from "@/dto";

interface MusicCardProps {
  record: MusicRecord;
  onSelected?: (record: MusicRecord) => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ record, onSelected }) => {
  return (
    <div className="MusicCard" onClick={() => onSelected && onSelected(record)}>
      <p>{record.name}</p>
      <p>{record.size}</p>
      <p>{record.duration}</p>
      <div className="img-wapper">
        <img src={record.poster} alt={record.name} />
      </div>
    </div>
  );
};

export default MusicCard;

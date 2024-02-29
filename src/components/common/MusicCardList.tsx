import "./MusicCardList.scss";
import { MusicRecord } from "@/dto";
import MusicCard from "@/components/common/MusicCard";

interface MusicCardListProps {
  cards: MusicRecord[];
  onSelectedMusic?: (music: MusicRecord) => void;
  selectedId: string | null;
}

const MusicCardList: React.FC<MusicCardListProps> = ({
  cards,
  onSelectedMusic,
  selectedId,
}) => {
  const cardList = cards.map((record) => (
    <MusicCard
      key={record.id}
      record={record}
      onSelected={onSelectedMusic}
      isPlaying={record.id === selectedId}
    />
  ));
  return <div className="MusicCardList">{cardList}</div>;
};

export default MusicCardList;

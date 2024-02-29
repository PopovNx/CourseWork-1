import "./MusicCardList.scss";
import { MusicRecord } from "@/dto";
import MusicCard from "@/components/common/MusicCard";

interface MusicCardListProps {
  cards: MusicRecord[];
  onSelectedMusic?: (music: MusicRecord) => void;
}

const MusicCardList: React.FC<MusicCardListProps> = ({
  cards,
  onSelectedMusic,
}) => {
  const cardList = cards.map((record) => (
    <MusicCard key={record.id} record={record} onSelected={onSelectedMusic} />
  ));
  return <div className="MusicCardList">{cardList}</div>;
};

export default MusicCardList;

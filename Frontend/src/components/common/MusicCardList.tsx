import "./MusicCardList.scss";
import { MusicRecord } from "@/dto";
import MusicCard from "@/components/common/MusicCard";
import { Api } from "@/service/api";

interface MusicCardListProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const MusicCardList: React.FC<MusicCardListProps> = ({
  onSelect,
  selectedId,
}) => {
  const { data: tracks } = Api.useTracksSuspense();

  const cardList = tracks.map((record) => (
    <MusicCard
      key={record.id}
      record={record}
      onSelected={() => onSelect(record.id)}
      isPlaying={record.id === selectedId}
    />
  ));
  return <div className="MusicCardList">{cardList}</div>;
};

export default MusicCardList;

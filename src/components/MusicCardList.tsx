import styled from "@emotion/styled";
import { MusicRecord } from "../dto";
import MusicCard from "./MusicCard";

interface MusicCardListProps {
  cards: MusicRecord[];
  onSelectedMusic: (music: MusicRecord) => void;
}

const MusicCardListWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  padding: 10px;
`;

const MusicCardList: React.FC<MusicCardListProps> = ({
  cards,
  onSelectedMusic,
}) => {
  const cardList = cards.map((info) => (
    <MusicCard
      key={info.id}
      info={info}
      onSelected={() => onSelectedMusic(info)}
    />
  ));
  return <MusicCardListWrapper>{cardList}</MusicCardListWrapper>;
};

export default MusicCardList;

import styled from "@emotion/styled";
import { MusicRecord } from "../dto";

interface MusicCardProps {
  info: MusicRecord;
  onSelected?: () => void;
}

const MusicCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #282c34;
  color: white;
  padding: 10px;
  text-align: center;

  border-radius: 10px;

  .img-wapper {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    img {
      object-fit: cover;
      border-radius: 10px;
    }
    padding: 10px;
  }
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  cursor: pointer;
`;

const MusicCard: React.FC<MusicCardProps> = ({ info, onSelected }) => {
  return (
    <MusicCardWrapper onClick={onSelected}>
      <p>{info.name}</p>
      <p>{info.size}</p>
      <p>{info.duration}</p>
      <div className="img-wapper">
        <img src={info.poster} alt={info.name} />
      </div>
    </MusicCardWrapper>
  );
};

export default MusicCard;

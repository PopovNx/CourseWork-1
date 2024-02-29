import styled from "@emotion/styled";
import { MusicRecord } from "../dto";

interface MusicPlayerModalProps {
  activeMusic: MusicRecord;
  onExit?: () => void;
}

const MusicPlayerModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MusicPlayerBody = styled.div`
  background-color: #282c34;
  width: 400px;
  height: 200px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MusicPlayerAudioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  audio {
    width: 100%;
  }
`;

const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({
  activeMusic,
  onExit,
}) => {
  return (
    <MusicPlayerModalWrapper onClick={onExit}>
      <MusicPlayerBody>
        <div>Playing: {activeMusic.name}</div>
        <MusicPlayerAudioWrapper>
          <audio src={activeMusic.playUrl} controls />
        </MusicPlayerAudioWrapper>
      </MusicPlayerBody>
    </MusicPlayerModalWrapper>
  );
};

export default MusicPlayerModal;

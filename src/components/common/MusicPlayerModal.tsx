import "./MusicPlayerModal.scss";
import { MusicRecord } from "@/dto";

interface MusicPlayerModalProps {
  activeMusic: MusicRecord;
  onExit?: () => void;
}

const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({
  activeMusic,
  onExit,
}) => {
  return (
    <div className="MusicPlayerModal" onClick={onExit}>
      <div
        className="MusicPlayerModal__body"
        onClick={(e) => e.stopPropagation()}
      >
        <div>Playing: {activeMusic.name}</div>
        <div className="MusicPlayerModal__audio">
          <audio src={activeMusic.playUrl} controls />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerModal;

import React from "react";
import "./MusicPlayerPanel.scss";
import { MusicRecord } from "@/dto";
import { Api } from "@/service/api";
import moment from "moment";
import { useMusicPlayer } from "@/service/playerStore";
import PlayControls from "@/components/common/PlayControls";

interface MusicPlayerProps {
  activeMusic: MusicRecord;
}

interface MusicPlayerPlaySeekerProps {
  onSeek?: (progress: number) => void;
}

const MusicPlayerPlaySeeker: React.FC<MusicPlayerPlaySeekerProps> = ({
  onSeek,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const progress = useMusicPlayer((state) => state.progress);

  const onTrySeek = (e: React.MouseEvent<HTMLDivElement>, force = false) => {
    if (!isDragging && !force) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = x / rect.width;
    onSeek && onSeek(newProgress);
  };

  const width = `${progress * 100}%`;
  return (
    <div
      className="MusicPlayerPlaySeeker"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={onTrySeek}
      onMouseLeave={() => setIsDragging(false)}
      onClick={(e) => onTrySeek(e, true)}
    >
      <div className="MusicPlayerPlaySeeker__progress">
        <div className="MusicPlayerPlaySeeker__progress-bar" style={{ width }}>
          <span className="MusicPlayerPlaySeeker__knob"></span>
        </div>
      </div>
    </div>
  );
};

const formatTime = (current: number) =>
  moment.utc(current * 1000).format("mm:ss");

const MusicPlayerPanel: React.FC<MusicPlayerProps> = ({ activeMusic }) => {
  const player = useMusicPlayer();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const onSeek = (progress: number) => {
    player.updateProgress(progress);
    if (!audioRef.current) return;
    audioRef.current.currentTime = audioRef.current.duration * progress;
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (player.playing) audio.play();
    else audio.pause();
  }, [player.playing]);

  return (
    <div className="MusicPlayerPanel">
      <div className="MusicPlayerPanel__songInfo">
        <div className="MusicPlayerPanel__progressControl">
          <MusicPlayerPlaySeeker onSeek={onSeek} />
        </div>
        <h2 className="MusicPlayerPanel__songInfo-title">
          {activeMusic.title}
        </h2>
        <div className="MusicPlayerPanel__songInfo-image">
          <img
            src={Api.resolvePosterUrl(activeMusic.id)}
            alt={activeMusic.title}
          />
        </div>
      </div>
      <div className="MusicPlayerPanel__controls">
        <PlayControls />
      </div>
      <div className="MusicPlayerPanel__metrix">
        <p>{formatTime(audioRef.current?.currentTime || 0)}</p>/
        <p>{formatTime(audioRef.current?.duration || 0)}</p>
      </div>
      <audio
        autoPlay
        controls
        src={Api.resolveTrackUrl(activeMusic.id)}
        className="MusicPlayerPanel__audio"
        ref={audioRef}
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (!audio) return;
          player.updateProgress(audio.currentTime / audio.duration);
        }}
        onPlay={() => player.setPlaying(true)}
        onPause={() => player.setPlaying(false)}
      ></audio>
    </div>
  );
};

export default MusicPlayerPanel;

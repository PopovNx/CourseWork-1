import React from "react";
import "./MusicPlayerPanel.scss";
import { MusicRecord } from "@/dto";
import { Api } from "@/service/api";
import moment from "moment";
import playIcon from "@/assets/play.svg?url";
import pauseIcon from "@/assets/pause.svg?url";
import nextIcon from "@/assets/next.svg?url";
import prevIcon from "@/assets/prev.svg?url";

interface MusicPlayerProps {
  activeMusic: MusicRecord;
  onNext?: () => void;
  onPrevious?: () => void;
}

interface MusicPlayerPlaySeekerProps {
  progress: number;
  onSeek?: (progress: number) => void;
}

interface MusicPlayerPlayControlsProps {
  playing: boolean;
  togglePlay?: () => void;
}

const MusicPlayerPlaySeeker: React.FC<MusicPlayerPlaySeekerProps> = ({
  progress,
  onSeek,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);

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

const PlayControls: React.FC<MusicPlayerPlayControlsProps> = (props) => {
  return (
    <div className="PlayControls">
      <button
        title="Previous"
        className="PlayControls__previous PlayControls__button"
      >
        <img src={prevIcon} alt="Perv" />
      </button>
      <button
        onClick={props.togglePlay}
        title="Play/Pause"
        className="PlayControls__play PlayControls__button"
      >
        {props.playing ? (
          <img src={pauseIcon} alt="Pause" />
        ) : (
          <img src={playIcon} alt="Play" />
        )}
      </button>
      <button title="Next" className="PlayControls__next PlayControls__button">
        <img src={nextIcon} alt="Next" />
      </button>
    </div>
  );
};

const formatTime = (current: number) =>
  moment.utc(current * 1000).format("mm:ss");

const MusicPlayerPanel: React.FC<MusicPlayerProps> = ({ activeMusic }) => {
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const onSeek = (progress: number) => {
    console.log("Seek to", progress);
    setProgress(progress);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = audio.duration * progress;
    }
  };

  React.useEffect(() => {
    const mediaSession = navigator.mediaSession;

    const interval = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;
      mediaSession.metadata = new MediaMetadata({
        title: "Super player",
        album: activeMusic.title,
        artwork: [
          {
            src: Api.resolvePosterUrl(activeMusic.id),
            sizes: "96x96",
            type: "image/png",
          },
        ],
      });

      const newProgress = audio.currentTime / audio.duration;
      setProgress(newProgress);
      console.log("Progress", newProgress);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const poster = Api.resolvePosterUrl(activeMusic.id);
  const musicUrl = Api.resolveTrackUrl(activeMusic.id);

  return (
    <div className="MusicPlayerPanel">
      <div className="MusicPlayerPanel__songInfo">
        <div className="MusicPlayerPanel__progressControl">
          <MusicPlayerPlaySeeker progress={progress} onSeek={onSeek} />
        </div>
        <h2 className="MusicPlayerPanel__songInfo-title">
          {activeMusic.title}
        </h2>
        <div className="MusicPlayerPanel__songInfo-image">
          <img src={poster} alt={activeMusic.title} />
        </div>
      </div>
      <div className="MusicPlayerPanel__controls">
        <PlayControls
          playing={audioRef.current ? !audioRef.current.paused : false}
          togglePlay={togglePlay}
        />
      </div>
      <div className="MusicPlayerPanel__metrix">
        <p>{formatTime(audioRef.current?.currentTime || 0)}</p>/
        <p>{formatTime(audioRef.current?.duration || 0)}</p>
      </div>
      <audio
        autoPlay
        controls
        src={musicUrl}
        className="MusicPlayerPanel__audio"
        ref={audioRef}
      ></audio>
    </div>
  );
};

export default MusicPlayerPanel;

import React from "react";
import "./MusicPlayerPanel.scss";
import { MusicRecord } from "@/dto";
import { Api } from "@/service/api";

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
  onPlayToggle?: (playing: boolean) => void;
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

const PlayControls: React.FC<MusicPlayerPlayControlsProps> = ({
  playing,
  onPlayToggle,
}) => {
  return (
    <div className="PlayControls">
      <button onClick={() => onPlayToggle && onPlayToggle(!playing)}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
};

const formatTime = (current: number) => {
  //00:00
  const minutes = Math.floor(current / 60);
  const seconds = Math.floor(current % 60);

  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  return `${minutesStr}:${secondsStr}`;

}

const MusicPlayerPanel: React.FC<MusicPlayerProps> = ({ activeMusic }) => {
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const playing = audioRef.current ? !audioRef.current.paused : false;


  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
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
          { src: Api.resolvePosterUrl(activeMusic.id), sizes: "96x96", type: "image/png" },
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
        <h2 className="MusicPlayerPanel__songInfo-title">{activeMusic.title}</h2>
        <div className="MusicPlayerPanel__songInfo-image">
          <img src={poster} alt={activeMusic.title} />
        </div>
      </div>
      <div className="MusicPlayerPanel__progressControl">
        <MusicPlayerPlaySeeker progress={progress} onSeek={onSeek} />
      </div>

      <div className="MusicPlayerPanel__metrix">
        <p>{formatTime(audioRef.current?.currentTime || 0)}</p>
         /
        <p>{formatTime(audioRef.current?.duration || 0)}</p>
      </div>
      <div className="MusicPlayerPanel__controls">
        <PlayControls playing={playing} onPlayToggle={togglePlay} />
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

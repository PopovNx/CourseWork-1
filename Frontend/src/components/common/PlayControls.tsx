import React from "react";
import "./PlayControls.scss";
import playIcon from "@/assets/play.svg?url";
import pauseIcon from "@/assets/pause.svg?url";
import nextIcon from "@/assets/next.svg?url";
import prevIcon from "@/assets/prev.svg?url";
import { useMusicPlayer } from "@/service/playerStore";

const PlayControls: React.FC = () => {
  const player = useMusicPlayer();
  return (
    <div className="PlayControls">
      <button
        title="Previous"
        type="button"
        className="PlayControls__previous PlayControls__button"
        onClick={() => player.previous()}
      >
        <img src={prevIcon} alt="Perv" />
      </button>
      <button
        onClick={() => player.pausePlay()}
        title="Play/Pause"
        className="PlayControls__play PlayControls__button"
      >
        {player.playing ? (
          <img src={pauseIcon} alt="Pause" />
        ) : (
          <img src={playIcon} alt="Play" />
        )}
      </button>
      <button
        title="Next"
        type="button"
        className="PlayControls__next PlayControls__button"
        onClick={() => player.next()}
      >
        <img src={nextIcon} alt="Next" />
      </button>
    </div>
  );
};

export default PlayControls;

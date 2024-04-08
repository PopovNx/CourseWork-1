import { Api } from "@/service/api";
import "./MusicCard.scss";
import { MusicRecord } from "@/dto";
import moment from "moment";
import playIcon from "@/assets/play.svg?url";
import React from "react";
import pauseIcon from "@/assets/pause.svg?url";
import { useMusicPlayer } from "@/service/playerStore";

interface MusicCardProps {
  record: MusicRecord;
  isSelected: boolean;
  isPlaying: boolean;
}

const MusicCard: React.FC<MusicCardProps> = ({
  record,
  isPlaying,
  isSelected,
}) => {
  const player = useMusicPlayer();
  const posterUrl = Api.resolvePosterUrl(record.id);
  const playingClass = isSelected ? "playing" : "";
  const duration = moment.utc(record.duration * 1000).format("mm:ss");
  return (
    <div
      className={`MusicCard ${playingClass}`}
      onClick={() => player.pausePlay(record.id)}
    >
      <div className="MusicCard__poster">
        <img
          className="MusicCard__poster-image"
          src={posterUrl}
          alt={record.title}
        />
        <div className="MusicCard__poster-overlay">
          {!isPlaying && (
            <img src={playIcon} alt="Play" className="MusicCard__poster-icon" />
          )}
          {isPlaying && (
            <img
              src={pauseIcon}
              alt="Stop"
              className="MusicCard__poster-icon"
            />
          )}
          {!isPlaying && <p className="MusicCard__poster-duration">{duration}</p>}
        </div>
      </div>
      <p>{record.title}</p>
    </div>
  );
};

export default MusicCard;

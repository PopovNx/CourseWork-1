import moment from "moment";
import "./HistoryList.scss";
import { Api } from "@/service/api";
import { useMusicPlayer } from "@/service/playerStore";

const HistoryList: React.FC = () => {
  const player = useMusicPlayer();
  return (
    <div className="HistoryList">
      {player.history.map((record) => (
        <div
          key={record.id + record.timeUnix}
          className="HistoryList__record"
          onClick={() => player.pausePlay(record.id)}
        >
          <div className="HistoryList__record-poster">
            <img src={Api.resolvePosterUrl(record.id)} alt={record.title} />
          </div>
          <div className="HistoryList__record-title">{record.title}</div>
          <div className="HistoryList__record-time">
            {moment.unix(record.timeUnix).fromNow()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;

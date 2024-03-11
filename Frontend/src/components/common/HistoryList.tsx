import { HistoryRecord } from "@/dto/HistoryRecord";
import moment from "moment";
import "./HistoryList.scss";
import { Api } from "@/service/api";

const HistoryList: React.FC<{
  history: HistoryRecord[];
  onSelect: (id: string) => void;
}> = ({ history, onSelect }) => {
  return (
    <div className="HistoryList">
      {history.map((record) => (
        <div
          key={record.id + record.timeUnix}
          className="HistoryList__record"
          onClick={() => onSelect(record.id)}
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

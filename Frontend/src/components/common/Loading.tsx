import loadingIcon from '@/assets/loading.svg?url'
import './Loading.scss';

const Loading: React.FC = () => {
  return (
    <div className="Loading">
      <img src={loadingIcon} alt="loading" />
    </div>
  );
};

export default Loading;

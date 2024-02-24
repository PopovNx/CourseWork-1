import { useEffect, useState } from "react";
import { MusicInfo } from "../dto/MusicInfo";
import { Api } from "../api";

export default (info: MusicInfo) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMusicText = async () => {
    setLoading(true);
    const text = await Api.fetchMusicText(info);
    console.log(text);
    setText(text);
    setLoading(false);
  };

  useEffect(() => {
    console.log("fetching text");
    fetchMusicText();
  }, [info]);
  return (
    <div>
      <p>Card!: {info.name}</p>
      <audio controls src={Api.resolveMusicUrl(info)} />
      <h4>Text:</h4>
        {loading && <p>Loading...</p>}
        <p>{text}</p>
    </div>
  );
};

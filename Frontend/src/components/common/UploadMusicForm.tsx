import { Api } from "@/service/api";
import React from "react";
import Loading from "@/components/common/Loading";
import "./UploadMusicForm.scss";

const UploadMusicForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Api.uploadMusic(new FormData(e.currentTarget));
      formRef.current?.reset();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="UploadMusicForm">
      <h1>Upload Music</h1>
      {loading && <Loading />}
      {!loading && (
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="UploadMusicForm__form"
          encType="multipart/form-data"
        >
          <fieldset>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                maxLength={100}
                minLength={3}
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <input
                type="file"
                name="content"
                id="content"
                required
                accept="audio/*"
              />
            </div>
            <div>
              <label htmlFor="poster">Poster</label>
              <input
                type="file"
                name="poster"
                id="poster"
                required
                accept="image/*"
              />
            </div>
            <button type="submit">Upload</button>
          </fieldset>
        </form>
      )}
    </div>
  );
};
export default UploadMusicForm;

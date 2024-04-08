import "./UploadPage.scss";

import React from "react";
import Header from "@/components/common/Header";
import UploadMusicForm from "@/components/common/UploadMusicForm";

const UploadPage: React.FC = () => {
  return (
    <main className="UploadPage">
      <div className="UploadPage__pages section">
        <Header />
      </div>
      <div className="UploadPage__content section">
        <UploadMusicForm />
      </div>
    </main>
  );
};

export default UploadPage;

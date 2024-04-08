import React from "react";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
const Header: React.FC = () => {
  const location = useLocation();
  return (
    <div className="Header">
      <h1>PVQ Player</h1>
      <nav>
        <Link to={"/"} className={location.pathname === "/" ? "active" : ""}>
          Player
        </Link>
        <Link
          to={"/upload"}
          className={location.pathname === "/upload" ? "active" : ""}
        >
          Upload
        </Link>
      </nav>
    </div>
  );
};

export default Header;

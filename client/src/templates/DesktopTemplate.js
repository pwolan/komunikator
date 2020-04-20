import React from "react";
import { Link } from "react-router-dom";

const DesktopTemplate = ({ children }) => {
  return (
    <>
      <h1>desktop</h1>
      <nav>
        <Link to="/">/</Link>
        <Link to="/chats">/chats</Link>
        <Link to="/adduser">/adduser</Link>
      </nav>
      {children}
    </>
  );
};

export default DesktopTemplate;

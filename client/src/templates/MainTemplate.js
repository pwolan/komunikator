import React from "react";
import MediaQuery from "react-responsive";
import MobileTemplate from "./MobileTemplate";
import DesktopTemplate from "./DesktopTemplate";

const MainTemplate = ({ children }) => {
  return (
    <>
      <h1>Main Template</h1>
      <MediaQuery maxWidth="600px">
        <MobileTemplate>{children}</MobileTemplate>
      </MediaQuery>
      <MediaQuery minWidth="601px">
        <DesktopTemplate>{children}</DesktopTemplate>
      </MediaQuery>
    </>
  );
};

export default MainTemplate;

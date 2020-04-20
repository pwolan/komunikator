import React from "react";
import MediaQuery from "react-responsive";
import MobileTemplate from "./MobileTemplate";
import DesktopTemplate from "./DesktopTemplate";
import { theme } from "theme/theme";

const MainTemplate = ({ children }) => {
  return (
    <>
      <MediaQuery maxWidth={theme.media.medium}>
        <MobileTemplate>{children}</MobileTemplate>
      </MediaQuery>
      <MediaQuery minWidth={theme.media.medium + 1}>
        <DesktopTemplate>{children}</DesktopTemplate>
      </MediaQuery>
    </>
  );
};

export default MainTemplate;

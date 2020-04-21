import React from "react";
import { Mobile, Tablet, Desktop } from "theme/Breakpoints";
import MobileTemplate from "./MobileTemplate";
import DesktopTemplate from "./DesktopTemplate";
// import TabletTemplate from "./TabletTemplate";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Mobile>
        <MobileTemplate>{children}</MobileTemplate>
      </Mobile>
      <Tablet>
        <MobileTemplate>{children}</MobileTemplate>
      </Tablet>
      <Desktop>
        <DesktopTemplate>{children}</DesktopTemplate>
      </Desktop>
    </>
  );
};

export default MainTemplate;

import React from "react";
import Logo from "components/small/Logo";
import MobileNavbar from "components/large/MobileNavbar";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const StyledMain = styled.main`
  flex-grow: 1;
  overflow: auto;
`;

const MobileTemplate = ({ children }) => {
  return (
    <StyledContainer>
      <Logo />
      <StyledMain>{children}</StyledMain>
      <MobileNavbar />
    </StyledContainer>
  );
};

export default MobileTemplate;

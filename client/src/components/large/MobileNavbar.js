import React from "react";
import MobileNavLink from "components/small/MobileNavLink";
import styled from "styled-components";
import {
  faCommentDots,
  faUserCircle,
  faQuestionCircle,
  faPlusCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${({ theme }) => theme.color.primary};
  height: 62px;
`;
const MobileNavbar = () => {
  return (
    <nav>
      <StyledUl>
        <MobileNavLink to="/chats" icon={faCommentDots}></MobileNavLink>
        <MobileNavLink to="/online" icon={faUserCircle}></MobileNavLink>
        <MobileNavLink to="/random" icon={faQuestionCircle}></MobileNavLink>
        <MobileNavLink to="/plus" icon={faPlusCircle}></MobileNavLink>
        <MobileNavLink to="/settings" icon={faCog}></MobileNavLink>
      </StyledUl>
    </nav>
  );
};

export default MobileNavbar;

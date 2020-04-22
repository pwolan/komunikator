import React from "react";
import styled from "styled-components";
import NavLink from "components/small/NavLink";

const NavBar = styled.div`
  height: 80px;
  background: rgb(91, 91, 91);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Navbar = () => {
  return (
    <NavBar>
      <StyledUl>
        <NavLink to="/addfriend" children="Add Friends"></NavLink>
        <NavLink to="/groups" children="Groups"></NavLink>
        <NavLink to="/random" children="Random"></NavLink>
        <NavLink to="/settings" children="Settings"></NavLink>
      </StyledUl>
    </NavBar>
  );
};

export default Navbar;

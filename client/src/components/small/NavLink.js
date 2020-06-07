import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledLi = styled.li`
  height: 100%;
  width: 25%;
  a {
    display: block;
    color: white;
    text-decoration: none;
    font-size: 19px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    background: ${({ theme }) => theme.color.gray.dark};
  }
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    a {
      font-size: 28px;
    }
  }
`;

const DesktopNavLink = ({ to, children }) => (
  <StyledLi>
    <NavLink to={to} activeClassName="active">
      {children}
    </NavLink>
  </StyledLi>
);

DesktopNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default DesktopNavLink;

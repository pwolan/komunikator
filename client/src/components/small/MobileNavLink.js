import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledLi = styled.li``;
const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 35px;
  &:hover {
    color: #805726;
  }
  .active > & {
    color: #804600;
  }
`;

const MobileNavLink = ({ to, children, icon }) => (
  <StyledLi>
    <NavLink to={to} activeClassName="active">
      <StyledIcon icon={icon} />
      {children}
    </NavLink>
  </StyledLi>
);

MobileNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  // children: PropTypes.string.isRequired,
};
export default MobileNavLink;

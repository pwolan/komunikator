import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

const Boxdel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const Line = styled.div`
  height: 100%;
  width: 1%;
  background: ${({ theme }) => theme.color.primary};
`;
const StyledButton = styled.button`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 33px;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 70px;
`;

const MobilePlus = () => {
  return (
    <Boxdel>
      <StyledButton as={Link} to="/addfriend">
        <StyledIcon icon={faUserPlus} />
        <div>Add Friend</div>
      </StyledButton>
      <Line />
      <StyledButton as={Link} to="/groups">
        <StyledIcon icon={faUsers} />
        <div>Groups</div>
      </StyledButton>
    </Boxdel>
  );
};

export default MobilePlus;

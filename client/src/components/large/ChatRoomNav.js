import React from "react";
import styled from "styled-components";
import withContext from "context/withContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPhoneAlt, faVideo } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  height: 56px;
  @media (min-width: 992px) {
    height: 80px;
  }
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  color: white;
  padding: 0 5px;
  background: ${({ theme }) => theme.color.primary};
  h5 {
    padding-left: 20px;
    font-size: 30px;
  }
`;
const StyledLeft = styled(FontAwesomeIcon)`
  @media (min-width: 992px) {
    display: none;
  }
  font-size: 30px;
  margin-right: 5px;
`;
const AvatarContainer = styled.div`
  width: 35px;
`;
const Avatar = styled.img`
  object-fit: cover;
  width: 100%;
  border-radius: 10px;
  margin-left: 10px;
  border-radius: 100%;
  background: white;
`;
const Buttons = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;
const StyledCall = styled(FontAwesomeIcon)`
  font-size: 30px;
  padding-left: 10px;
  cursor: pointer;
`;

const ChatRoomNav = ({ userContext }) => {
  const { user } = userContext;
  return (
    <Container>
      <StyledLeft icon={faArrowLeft} />
      <AvatarContainer>
        <Avatar src="" alt="" />
      </AvatarContainer>
      <h5>{user.username}</h5>
      <Buttons>
        <StyledCall icon={faPhoneAlt} />
        <StyledCall icon={faVideo} />
      </Buttons>
    </Container>
  );
};

export default withContext(ChatRoomNav);

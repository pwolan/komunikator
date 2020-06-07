import React, { useState, useEffect } from "react";
import styled from "styled-components";
import withContext from "context/withContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPhoneAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import * as ChatApi from "network/chatroom";
import { withRouter } from "react-router";

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

const ChatRoomNav = ({ match }) => {
  let [roomName, setRoomName] = useState("");
  let { roomId } = match.params;
  async function init(roomId) {
    console.log(roomId);
    let roomData = await ChatApi.getRoomData(roomId);
    console.log(roomData);
    setRoomName(roomData.roomName);
  }
  useEffect(() => {
    init(roomId);
    console.log("effect");
  }, [roomId]);
  return (
    <Container>
      <StyledLeft icon={faArrowLeft} />
      <AvatarContainer>
        <Avatar src="/avatars/default.png" alt="" />
      </AvatarContainer>
      <h5>{roomName}</h5>
      <Buttons>
        <StyledCall icon={faPhoneAlt} />
        <StyledCall icon={faVideo} />
      </Buttons>
    </Container>
  );
};

export default withRouter(withContext(ChatRoomNav));

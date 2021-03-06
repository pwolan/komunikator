import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "components/small/Avatar";
import styled from "styled-components";
import OnlineCard from "./OnlineCard";
import * as OnlineApi from "network/onlineUsers";

const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gray.lighter};
  padding: 5px 10px;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.gray.medium};
    text-decoration: none;
  }
  @media (min-width: ${({ theme }) => theme.media.large}) {
    background-color: ${({ theme }) => theme.color.gray.online};
  }
`;
const Content = styled.div`
  flex-grow: 1;
  overflow: hidden;
  color: black;
  @media (min-width: ${({ theme }) => theme.media.large}) {
    color: white;
  }
`;
const Username = styled.div`
  font-weight: bold;
  font-size: 18px;
`;
const StyledButton = styled.button`
  background: ${({ theme }) => theme.color.primary};
  border: 0px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  margin-right: 10px;
  padding: 5px 10px;
  &:disabled {
    background: ${({ theme }) => theme.color.disabled};
  }
  &:focus {
    outline: 0;
  }
`;

const AcceptCard = ({ username, src, alt, idusers, roomid }) => {
  const [userStatus, setUserStatus] = useState("waiting");
  const [isAcceptDisabled, setIsAcceptDisabled] = useState(false);
  const [isDeclineDisabled, setIsDeclineDisabled] = useState(false);
  async function handleAccept() {
    setIsAcceptDisabled(true);
    let succes = await OnlineApi.acceptFriend(idusers);
    if (succes) {
      setUserStatus("accepted");
    }
    setIsAcceptDisabled(false);
  }
  async function handleDecline() {
    setIsDeclineDisabled(true);
    let succes = await OnlineApi.declineFriend(idusers);
    if (succes) {
      setUserStatus("declined");
    }
    setIsDeclineDisabled(false);
  }
  switch (userStatus) {
    case "waiting":
      return (
        <Container>
          <Avatar src={src} alt={alt} />
          <Content>
            <Username>{username}</Username>
            <StyledButton disabled={isAcceptDisabled} onClick={handleAccept}>
              Accept
            </StyledButton>
            <StyledButton disabled={isDeclineDisabled} onClick={handleDecline}>
              Decline
            </StyledButton>
          </Content>
        </Container>
      );
    case "accepted":
      return (
        <OnlineCard username={username} src={src} alt={alt} idusers={idusers} roomid={roomid} />
      );
    case "declined":
      return null;
  }
};

AcceptCard.propTypes = {
  username: PropTypes.string.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
};

AcceptCard.defaultProps = {
  src: "/avatars/default.png",
  alt: "avatar",
};

export default AcceptCard;

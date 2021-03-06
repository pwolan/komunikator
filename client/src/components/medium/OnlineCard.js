import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "components/small/Avatar";

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
const DotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: green;
  padding-right: 10px;
`;
const Username = styled.div`
  font-weight: bold;
  font-size: 18px;
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    font-size: 25px;
  }
`;
const Status = styled.div`
  font-size: 14px;
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    font-size: 18px;
  }
`;

const OnlineCard = ({ username, src, alt, roomid }) => {
  return (
    <Container as={Link} to={`/chats/${roomid}`}>
      <Avatar src={src} alt={alt} />
      <Content>
        <Username>{username}</Username>
        <Status>Online</Status>
      </Content>
      <DotContainer>
        <Dot></Dot>
      </DotContainer>
    </Container>
  );
};

OnlineCard.propTypes = {
  username: PropTypes.string.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default OnlineCard;

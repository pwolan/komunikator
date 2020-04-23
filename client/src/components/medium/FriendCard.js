import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Avatar from "components/small/Avatar";

const FriendCardContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gray.lighter};
  padding: 5px 10px;
  cursor: pointer;
  ${({ newMess }) =>
    newMess &&
    css`
      background: ${({ theme }) => theme.color.secondary};
      font-weight: 600;
    `}
  &:hover {
    background: ${({ theme }) => theme.color.gray.light};
  }
`;
const FriendContent = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;
const FriendName = styled.div`
  font-weight: bold;
  font-size: 18px;
  ${({ newMess }) =>
    newMess &&
    css`
      font-weight: 900;
    `}
`;
const FriendText = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  font-size: 14px;
  padding-right: 15px;
`;
const FriendTime = styled.div`
  font-size: 11px;
`;

const FriendCard = ({ avatarSrc, notify, username, lastMsg, time, alt }) => {
  return (
    <FriendCardContainer newMess={notify}>
      <Avatar src={avatarSrc} alt={alt} />
      <FriendContent>
        <FriendName newMess={notify}>{username}</FriendName>
        <FriendText>{lastMsg}</FriendText>
        <FriendTime>{time}</FriendTime>
      </FriendContent>
    </FriendCardContainer>
  );
};

FriendCard.propTypes = {
  avatarSrc: PropTypes.string,
  notify: PropTypes.bool,
  username: PropTypes.string.isRequired,
  lastMsg: PropTypes.string,
  time: PropTypes.string,
  alt: PropTypes.string,
};

FriendCard.defaultProps = {
  avatarSrc: "/avatars/default.png",
  notify: false,
  lastMsg: "",
  time: "",
  alt: "",
};

export default FriendCard;

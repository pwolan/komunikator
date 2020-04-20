import React from "react";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const FriendCardContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgb(243, 243, 243);
  padding: 5px 0;
  cursor: pointer;
  ${({ newMess }) =>
    newMess &&
    css`
      background: rgb(244, 224, 198);
      font-weight: 600;
    `}
  &:hover {
    background: rgb(230, 230, 230);
  }
`;
const AvatarContainer = styled.div`
  flex-shrink: 0;
  height: 80px;
  width: 80px;
  position: relative;
`;
const Avatar = styled.img`
  height: 80%;
  width: 80%;
  border-radius: 100%;
  background: white;
  object-fit: cover;
  margin: 10% 10px;
  display: block;
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
`;
const FriendTime = styled.div`
  font-size: 11px;
`;

const FriendCard = ({ avatarSrc, notify, username, lastMsg, time }) => {
  return (
    <FriendCardContainer newMess={notify}>
      <AvatarContainer>
        <Avatar src={avatarSrc} alt="" />
      </AvatarContainer>
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
};

FriendCard.defaultProps = {
  avatarSrc: "/avatars/default.png",
};

export default FriendCard;
//avatarSrc, username, lastMsg, time
//     .friends-card.px-4.py-3.message(data-user="Johny Bravo")
//         .friends-card-avatar-container
//             img.friends-card-avatar(src="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png")
//             .friends-card-dot 1
//         .friends-card-content.p-3
//             .friends-card-username.font-weight-bold Johny Bravo
//             .friends-card-text Hej mała, lubie placki i inne potrawy
//             small.friends-car-time 2 a.m

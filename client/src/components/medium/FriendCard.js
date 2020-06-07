import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Avatar from "components/small/Avatar";
import moment from "moment";
import { Link } from "react-router-dom";

var lang = window.navigator.userLanguage || window.navigator.language;
lang = lang.split("-")[0];
try {
  require(`moment/locale/${lang}`);
} catch (err) {}

const FriendCardContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gray.lighter};
  padding: 5px 10px;
  cursor: pointer;
  ${({ newmess }) =>
    newmess &&
    css`
      background: ${({ theme }) => theme.color.secondary};
      font-weight: 600;
    `}
  &:hover {
    background: ${({ theme }) => theme.color.gray.light};
    text-decoration: none;
  }
`;
const FriendContent = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;
const FriendName = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: black;
  ${({ newmess }) =>
    newmess &&
    css`
      font-weight: 900;
    `}
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    font-size: 25px;
    height: 29px;
  }
`;
const FriendText = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  font-size: 14px;
  padding-right: 15px;
  color: black;
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    font-size: 19px;
    height: 23px;
  }
`;
const FriendTime = styled.div`
  font-size: 11px;
  color: black;
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    font-size: 14px;
  }
`;

const FriendCard = ({ avatar, notify, roomname, idrooms, message, date, alt }) => {
  console.log(lang);
  moment.locale(lang);
  let now = new moment().valueOf();
  console.log(moment.locale());
  let Moment;
  let time = parseInt(now) - parseInt(date);
  console.log(time);
  if (time < 86400000) {
    Moment = new moment(date).format("LT");
  } else if (time < 604800000) {
    Moment = new moment(date).format("ddd.");
  } else {
    Moment = new moment(date).format("DD.MM");
  }
  console.log(notify);
  return (
    <FriendCardContainer newmess={notify} as={Link} to={`/chats/${idrooms}`}>
      <Avatar src={avatar} alt={alt} />
      <FriendContent>
        <FriendName newmess={notify}>{roomname}</FriendName>
        <FriendText>{message}</FriendText>
        <FriendTime>{Moment.toString()}</FriendTime>
      </FriendContent>
    </FriendCardContainer>
  );
};

FriendCard.propTypes = {
  avatar: PropTypes.string,
  // notify: PropTypes.bool,
  roomname: PropTypes.string.isRequired,
  message: PropTypes.string,
  date: PropTypes.number.isRequired,
  alt: PropTypes.string,
};

FriendCard.defaultProps = {
  avatar: "/avatars/default.png",
  notify: false,
  message: "",
  alt: "",
};

export default FriendCard;

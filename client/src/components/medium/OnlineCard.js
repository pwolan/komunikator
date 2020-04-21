import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import withContext from "context/withContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gray.online};
  padding: 5px 10px;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.gray.medium};
    text-decoration: none;
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
  margin: 10% 0;
  display: block;
`;
const Content = styled.div`
  flex-grow: 1;
  overflow: hidden;
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
  color: white;
`;
const Status = styled.div`
  font-size: 14px;
  color: white;
`;

const OnlineCard = ({ username, src, alt, userContext, id }) => {
  const user = userContext.user || {};
  const { idusers } = user;

  let roomId = id < idusers ? `${id}#${idusers}` : `${idusers}#${id}`;
  return (
    <Container as={Link} to={`/chats/${roomId}`}>
      <AvatarContainer>
        <Avatar src={src} alt={alt} />
      </AvatarContainer>
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
  id: PropTypes.number.isRequired,
};

OnlineCard.defaultProps = {
  src: "/avatars/default.png",
  alt: "avatar",
};

export default withContext(OnlineCard);

//.friends-card.px-4.py-3(data-id=friend.idusers)
//             .friends-card-avatar-container
//                 img.friends-card-avatar(src="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png")
//             -if(friend.status == 1)
//                 .friends-card-content.p-3
//                     .friends-card-username.font-weight-bold=friend.username
//                     .friends-card-text Offline
//                 .friends-card-statusdot
//                     .friends-card-statusdot-body
//             -else
//                 .friends-card-content.p-3
//                     .friends-card-username.font-weight-bold=friend.username
//                     button.acceptFriend accept
//                     button.declineFriend decline

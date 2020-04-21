import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gray.online};
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.gray.medium};
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
`;
const Status = styled.div`
  font-size: 14px;
`;

const OnlineCard = ({ username, src, alt }) => {
  return (
    <Container>
      <AvatarContainer>
        <Avatar src={src} alt={alt} />
      </AvatarContainer>
      <Content>
        <Username>{username}</Username>
        <Status>Offline</Status>
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

OnlineCard.defaultProps = {
  src: "/avatars/default.png",
  alt: "avatar",
};

export default OnlineCard;

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

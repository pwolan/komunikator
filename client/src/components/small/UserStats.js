import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.gray.darker};
  width: 100%;
  height: 100%;

  display: flex;
`;

const AvatarContainer = styled.div``;
const Avatar = styled.img`
  width: 25px;
`;
const Content = styled.div``;
const Username = styled.div``;
const Logout = styled.a``;
const UserStats = () => {
  let username = "pwolan";
  return (
    <Container>
      <AvatarContainer>
        <Avatar src="/avatars/default.png" />
      </AvatarContainer>
      <Content>
        <Username>{username}</Username>
        <Logout href="http://localhost:3000/logout">logout</Logout>
      </Content>
    </Container>
  );
};
// .user-info-container.d-flex.order-md-1.mx-auto.mr-md-0
// .user-info-avatar-container
//     img.user-info-avatar(src="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png")
// .text-white
//     .user-info-username.px-2=username
//     a.text-white.px-2(href='/logout') logout
export default UserStats;

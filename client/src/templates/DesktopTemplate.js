import React from "react";
import styled from "styled-components";
import Chats from "views/Chats";
import Online from "views/Online";
import Logo from "components/small/Logo";
import NavBar from "components/large/Navbar";
import UserStats from "components/small/UserStats";
const Container = styled.div`
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: 80px calc(100vh - 80px);

  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Panel = styled.div`
  overflow: auto;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: block;
  height: 80px;
  background: rgb(255, 140, 0);
  color: white;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  h3 {
    margin: 0 auto;
  }
`;
const SectionHeader = styled.h3``;
const DesktopTemplate = ({ children }) => {
  return (
    <Container>
      <Logo />
      <NavBar></NavBar>
      <UserStats />
      <Box>
        <Title>
          <h3>Chats</h3>
        </Title>
        <Chats />
      </Box>
      <Panel>{children}</Panel>
      <Box>
        <Title>
          <SectionHeader>Online Users</SectionHeader>
        </Title>
        <Online />
      </Box>
    </Container>
  );
};

export default DesktopTemplate;

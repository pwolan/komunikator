import React from "react";
import styled from "styled-components";
import Chats from "views/Chats";
import Online from "views/Online";
import Logo from "components/small/Logo";
import NavBar from "components/large/Navbar";
import UserStats from "components/medium/UserStats";
import SectionTitle from "components/small/SectionTitle";
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
const SectionHeader = styled.h3``;
const DesktopTemplate = ({ children }) => {
  return (
    <Container>
      <Logo />
      <NavBar></NavBar>
      <UserStats />
      <Box>
        <SectionTitle>
          <h3>Chats</h3>
        </SectionTitle>
        <Chats />
      </Box>
      <Panel>{children}</Panel>
      <Box>
        <SectionTitle>
          <SectionHeader>Online Users</SectionHeader>
        </SectionTitle>
        <Online />
      </Box>
    </Container>
  );
};

export default DesktopTemplate;

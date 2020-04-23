import React from "react";
import styled from "styled-components";
import SectionTitle from "components/small/SectionTitle";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Groups = () => {
  return (
    <Container>
      <SectionTitle>
        <h3>Groups</h3>
      </SectionTitle>
    </Container>
  );
};

export default Groups;

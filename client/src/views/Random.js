import React from "react";
import styled from "styled-components";
import SectionTitle from "components/small/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeer } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Coming = styled.div`
  display: flex;
  font-size: 40px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 70px;
`;

const Random = () => {
  return (
    <Container>
      <SectionTitle>
        <h3>Random</h3>
      </SectionTitle>
      <Coming>Coming soon!</Coming>
      <StyledIcon icon={faBeer} />
    </Container>
  );
};

export default Random;

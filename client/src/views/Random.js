import React from "react";
import styled from "styled-components";
import SectionTitle from "components/small/SectionTitle";
import icon from "icons/beer_black.png";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Coming = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
`;

const Random = () => {
  return (
    <Container>
      <SectionTitle>
        <h3>Random</h3>
      </SectionTitle>
      <Coming>
        <StyledImg src={icon} />
        Coming soon!
      </Coming>
    </Container>
  );
};

export default Random;

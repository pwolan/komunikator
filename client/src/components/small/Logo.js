import React from "react";
import styled from "styled-components";
import beer from "icons/beer.png";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.primary};
  @media (min-width: ${({ theme }) => theme.media.large}) {
    color: white;
    background: ${({ theme }) => theme.color.logo};
    height: 80px;
  }
`;

const StyledImg = styled.img`
  filter: invert(100%);
`;
const StyledSpan = styled.span`
  margin: 0;
  color: white;
  font-weight: 700;
  font-size: 25px;
  padding-left: 5px;

  @media (min-width: ${({ theme }) => theme.media.large}) {
    font-weight: 900;
    font-size: 26px;
    padding-left: 5px;
  }
`;

const Logo = () => {
  return (
    <StyledContainer>
      <StyledImg src={beer} alt="beer" width="25px" height="25px" />
      <StyledSpan>Drink Together</StyledSpan>
    </StyledContainer>
  );
};

export default Logo;

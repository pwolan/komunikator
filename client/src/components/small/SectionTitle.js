import styled from "styled-components";

const SectionTitle = styled.div`
  height: 80px;
  background: ${({ theme }) => theme.color.primary};
  color: white;
  flex-shrink: 0;

  display: none;
  align-items: center;
  h3 {
    margin: 0 auto;
  }
  @media (min-width: ${({ theme }) => theme.media.large}) {
    display: flex;
  }
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    h3 {
      font-size: 38px;
    }
  }
`;
export default SectionTitle;

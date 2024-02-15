import styled from "styled-components";

export const StyledWaterProgressWrapper = styled.div`
  // margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 356px;
  }

  @media screen and (min-width: 1440px) {
    width: 391px;
  }
`;

export const StyledProgressTitle = styled.div`
  color: var(--dark-blue);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.33;
`;

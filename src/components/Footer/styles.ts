import styled from "styled-components";

import logopmfi from "../../assets/logo.png";

export const FooterContainer = styled.footer`
  width: 100%;
  background: var(--color-second-text);
  padding: 1.5rem;
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;

export const Container = styled.div`
  display: grid;
  max-width: 1100px;
  justify-content: space-between;
  grid-template-rows: auto auto;
  grid-template-areas: "social" "address";

  @media (min-width: 1100px) {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
`;

export const AddressContainer = styled.div`
  grid-area: address;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-areas: "logo info";
`;

export const Logo = styled.div`
  grid-area: logo;
  flex: 1;
  background: url(${logopmfi}) no-repeat center;
  max-height: 6rem;
  width: 4.8rem;
  background-size: contain;
  padding: 0;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-background);
  grid-area: info;
  margin-left: 1rem;
`;
export const Title = styled.div`
  font-size: 1.5rem;
`;

export const Info = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
  }
`;

export const SocialNet = styled.div`
  grid-area: social;
  color: var(--color-background);
  margin-bottom: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "socialnetwork ouvidoria";
  @media (min-width: 1100px) {
    align-items: flex-start;
    margin-bottom: 0;
    grid-template-columns: 1fr;
    grid-row-gap: 0.5rem;
    grid-template-rows: auto auto;
    grid-template-areas: "socialnetwork" "ouvidoria";
  }
`;

export const Social = styled.div`
  grid-area: socialnetwork;
  display: flex;
  flex-direction: column;
  @media (min-width: 1100px) {
    align-items: flex-start;
    flex-direction: row;
  }
`;
export const IconContainer = styled.div`
  margin: 0;
  margin-left: 1rem;
  display: flex;

  a {
    text-decoration: none;

    color: var(--color-background);
  }

  svg {
    margin-right: 1rem;
    font-size: 1.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Ouvidoria = styled.div`
  grid-area: ouvidoria;
`;

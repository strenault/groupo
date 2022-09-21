import React from "react";
import NotFoundIllustration from "../assets/404-illustration.svg";
import styled from "styled-components";

const Main = styled.main`
  height: calc(100vh - 70px);
`;

const Image = styled.img`
  max-height: 70vh;
`;

const PageNotFound = ({ message }) => {
  return (
    <Main className="d-flex flex-column align-items-center justify-content-center ">
      <Image src={NotFoundIllustration} alt="404 Page introuvable" />
    </Main>
  );
};

export default PageNotFound;

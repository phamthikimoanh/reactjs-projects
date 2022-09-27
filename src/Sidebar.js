import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SIDEBAR_LEFT_PADDING, LIGHTER_GREY, zIndex } from "./utils/constants";
import Logo from "./assets/images/jena-logo-2.gif";

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > a {
    color: ${() => LIGHTER_GREY};
    text-decoration: none;
    padding: 0.5rem 0;
  }
`;

const LogoImg = styled.img`
  width: 60%;
  margin: 1rem auto;
  display: block;
`;

const StyledSidebar = styled.div`
  width: 20%;
  height: 100vh;
  max-width: 200px;
  background: #0f0f14;
  padding: ${() => `0 ${SIDEBAR_LEFT_PADDING}vw`};
  position: sticky;
  top: 0;
  left: 0;
  z-index: ${zIndex.SIDEBAR};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.4);
`;

export default function Sidebar() {
  let NAV_ITEMS = ["Home", "To do list", "Color Pallettes"];
  return (
    <StyledSidebar>
      <LogoImg src={Logo} alt="logo" />
      <StyledNavigation>
        {NAV_ITEMS.map((item, i) => {
          return (
            <Link
              key={i}
              to={
                item === "Home" ? "/" : item.toLowerCase().replaceAll(" ", "-")
              }
            >
              {item}
            </Link>
          );
        })}
      </StyledNavigation>
    </StyledSidebar>
  );
}

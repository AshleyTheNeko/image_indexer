import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Pages = {
  Login: "/login",
  Register: "/register",
  Home: "/",
}

const ButtonsList = [
  {
    name: "Home",
    page: Pages.Home,
  },
]

export function toLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(Pages.Login);
  })
}

export default function Navbar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.localStorage.getItem("jwt") != null)
      setVisible(true);
  })
  if (visible == false)
    return (<></>)
  return (
    <NavbarContainer>
      <div >image indexer</div>
      <div >
        {ButtonsList.map((button, index) => (
          <NavbarButton key={index} onClick={() => navigate(button.page)}>
            {button.name}
          </NavbarButton>
        ))}
      </div>
    </NavbarContainer>
  );
}

const NavbarButton = styled.button`
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:hover {
  }
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
  padding-right: 1rem;
  height: 10vh;
`;
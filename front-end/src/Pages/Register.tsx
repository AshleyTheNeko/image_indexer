import React, { useState } from "react";
import "./Login.css";
import { Input, Button, Separator } from "../Components/BasicComponents";
import axios from "axios";
import { Pages } from "./NavBar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Theme from "../Components/Theme";

export default function Register() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirm_pass, setConfirmpass] = useState<string | null>(null);
  const navigate = useNavigate();
  const [global_error_msg, setGlobalErrorMsg] = useState("");
  const [username_error_msg, setUsernameErrorMsg] = useState("");
  const [email_error_msg, setEmailErrorMsg] = useState("");
  const [password_error_msg, setPassErrorMsg] = useState("");

  async function handleRegister() {
    setGlobalErrorMsg("");
    setUsernameErrorMsg("");
    setEmailErrorMsg("");
    setPassErrorMsg("");
    if (username == null || username.length == 0) {
      setUsernameErrorMsg("Enter your username");
    }
    if (email == null || email.length == 0) {
      setEmailErrorMsg("Enter your email");
    }
    if (password == null || confirm_pass == null)
      setPassErrorMsg("Enter your password and verify it")
    else if (password != confirm_pass) {
      setPassErrorMsg("You entered two different passwords")
      return;
    }
    if (email == null || password == null || username == null || confirm_pass == null || email.length == 0 || password.length == 0 || username.length == 0) return;
    axios
      .post(
        `http://localhost:8080/register`,
        { mail: email, pass: password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(
        (res) => {
          console.log(res);
          navigate(Pages.Login);
        },
        (err) => {
          setGlobalErrorMsg(err.message)
        }
      );
    console.log("register " + email + "; " + password);
  }

  return (
    <MainContainer>
      <LoginCard>
        <Title>CUMarea - Register</Title>
        <Input type="text"
          placeholder="Username"
          onChange={(text) => {
            setUsername(text.target.value);
          }} />
        <text>{username_error_msg}</text>
        <Input type="email"
          placeholder="Email"
          onChange={(text) => {
            setEmail(text.target.value);
          }} />
        <text>{email_error_msg}</text>
        <Input type="password"
          placeholder="Password"
          onChange={(text) => {
            setPassword(text.target.value);
          }} />
        <Input type="password"
          placeholder="Verify Password"
          onChange={(text) => {
            setConfirmpass(text.target.value);
          }} />
        <text>{password_error_msg}</text>
        <text>{global_error_msg}</text>
        <Separator />
        <Button onClick={handleRegister}>Register</Button>
      </LoginCard>
    </MainContainer>
  );
}


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${Theme.colors.primary};
  background-image: url("https://image.spreadshirtmedia.net/image-server/v1/mp/products/T1459A839PA4459PT28D159153019W8333H10000/views/1,width=1200,height=630,appearanceId=839,backgroundColor=F2F2F2/docteur-promotion-tasse-cadeau-cum-laude-autocollant.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: wrap-content;
  width: wrap-content;
  padding: 1rem;
  border-radius: 20px;
  background-color: ${Theme.colors.secondary};
`;

const Title = styled.h1`
  color: ${Theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
  shadow: 0 0 10px 0 ${Theme.colors.primary};
`;
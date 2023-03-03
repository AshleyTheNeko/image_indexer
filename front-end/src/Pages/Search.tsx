import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Pages } from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const navigate = useNavigate();
    const [error_msg, setErrorMsg] = useState("");
  
    async function handleLogin() {
      if (email == null || password == null) return;
      axios
        .post(
          `http://localhost:8080/search`,
          { query:  },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          (res) => {
            window.localStorage.setItem("jwt", res.data.token)
            navigate(Pages.Home);
          },
          (err) => {
            setErrorMsg(err.message)
          }
        );
      console.log("login " + email + "; " + password);
    }
    function handleRegister() {
      navigate(Pages.Register);
    }
    async function handleGoogle() {
      console.log("google");
    }
  
    return (
      <MainContainer>
        <LoginCard>
          <Title>CUMarea - Login</Title>
          <Input type="email"
            placeholder="Email"
            onChange={(text) => {
              if (text != null)
                setEmail(text.target.value);
            }} />
          <Input type="password"
            placeholder="Password"
            onChange={(text) => {
              if (text != null)
                setPassword(text.target.value);
            }} />
          <text>{error_msg}</text>
          <Separator />
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
          <Button onClick={handleGoogle}>Connect with Google</Button>
        </LoginCard>
      </MainContainer>
    );
  }
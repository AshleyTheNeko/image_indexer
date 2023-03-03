import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Pages } from "./NavBar";
import { useNavigate } from "react-router-dom";
import { Input, Button, Separator } from "../Components/BasicComponents";
import styled from "styled-components";
import Theme from "../Components/Theme";

export default function Search() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();
  const [error_msg, setErrorMsg] = useState("");

  const [element, setElement] = useState(<Logo />);

  useEffect(() => {
    axios
      .post("http://localhost:8080/images", {query: "owo", query_by: "ocr_result"})
      .then((data) => {
        var infos = data.data.map((meal) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MealInfoScreen", { meal: meal })
                }
                style={styles.mealImage}
              >
                <MealImage data_meal={meal}>{meal._id}</MealImage>
              </TouchableOpacity>
              <MealName key={meal._id}>{meal.name}</MealName>
              <MealLoc key={meal._id}>{meal.location}</MealLoc>
              <Text>{getElapseTime(meal.time)}</Text>
            </>
          );
        });
        setElement(infos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
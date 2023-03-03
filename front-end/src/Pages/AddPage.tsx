import React from "react";
import axios from "axios";
import { useState } from 'react';

export default function AddPage({ navigation }) {
  const formData = new FormData();
  formData.append("file", selectedFile);
  const [mealName, setText] = useState('');
  const [location, setTextLoc] = useState('');
  const [desc, setTextDesc] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <BackButton goBack={navigation.goBack} />
        <LogoWriting />
        <ProfileButton />
      </View>
      <Header>ADD A MEAL</Header>
      <TextInput label="Name"
        style={styles.input}
        onChangeText={(newMealName) => setText({newMealName})}
        defaultValue={mealName}
      />
      <TextInput label="Name" 
        style={styles.input}
        onChangeText={(newDesc) => setTextLoc({newDesc})}
        defaultValue={desc}
      />
      <TextInput label="Name" 
        style={styles.input}
        onChangeText={(newLocation) => setTextDesc({newLocation})}
        defaultValue={location}
      />
      <Button
        mode="contained"
        onPress={() => {
          axios
          .post("http://localhost:8080/dishes", {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            name: {mealName},
            desc: {desc},
            location: {location},
            allergens: '[1, 4, 5]',
            thumbnail: formData,
          })
          .then(() => {
            navigation.navigate("HomeScreen");
          })
          .catch((err) => {
            console.log(err);
          });
        }}
      >
        ADD MY MEAL
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    borderColor : 'red',
  },
  navContainer: {
    position: "fixed",
    alignItems: "center",
    top: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    justifyContent: "space-evenly",
    height: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: "black",
  },
});
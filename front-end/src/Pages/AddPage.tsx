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
    <div>
      <header>ADD A MEAL</header>
      <input title="Name"
        onChange={(newMealName) => setText({newMealName})}
        defaultValue={mealName}
      />
      <input title="Name" 
        onChange={(newDesc) => setTextLoc({newDesc})}
        defaultValue={desc}
      />
      <input title="Name" 
        onChange={(newLocation) => setTextDesc({newLocation})}
        defaultValue={location}
      />
      <button
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
      </button>
    </div>
  );
}

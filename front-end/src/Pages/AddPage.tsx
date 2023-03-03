import React from "react";
import axios from "axios";
import { useState } from 'react';

export default function AddPage() {
  const formData = new FormData();
  const [key_word, set_key_word] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [private_, setPrivate] = useState("false");

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target);
    console.log(event.target.files[0]);
  }

  return (
    <div>
      <header>ADD MY MEME</header>
      <input title="key word"
        onChange={(text) => {
          if (text != null)
            set_key_word(text.target.value);
        }}
      />
      <input type="checkbox" onChange={() => { if (private_ == "false") { setPrivate("true") } else { setPrivate("false") } }} />
      <form>
        <input type="file" onChange={handleFileSelect} />
      </form>
      <button
        onClick={() => {
          const jwt = window.localStorage.getItem("jwt");
          if (!selectedFile)
            return;
          formData.append("file", selectedFile);
          axios
            .post("http://localhost:8080/image", {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: jwt
              },
              key_word: { key_word },
              private: private_,
              image: formData,
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        ADD IMAGE
      </button>
    </div>
  );
}

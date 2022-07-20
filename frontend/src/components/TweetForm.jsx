import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";

function TweetForm() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/tweets", {
        author,
        content,
      })
      .then(() => {
        setAuthor("");
        setContent("");
      });
  }

  return (
    <div className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-[50%] mx-auto p-2 flex justify-center items-center">
        <h1 className="py-4 text-[1D2723]">
          Ajouter un <span className="text-[#F19333]">Tweet</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-col">
          <div className="my-4">
            <label htmlFor="pseudo" className="font-bold ">
              Pseudo :
            </label>
          </div>
          <div className="my-4">
            <input
              type="text"
              id="pseudo"
              required
              className="rounded-xl w-[50%] p-2 bg-[#ACBFC2]"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="content" className="font-bold">
              Votre tweet :
            </label>
          </div>
          <div className="my-4">
            <textarea
              id="content"
              className="rounded-xl w-[50%] h-[100px] p-2 bg-[#ACBFC2]"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-[20%] mx-auto flex justify-evenly text-[#1D2732] shadow-xl shadow-[#1D2723] rounded-xl bg-[#F19333]"
          >
            <AiOutlineSend className="my-auto" />
            <p>Envoyer</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default TweetForm;

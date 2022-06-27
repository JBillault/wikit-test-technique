import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import TweetForm from "./TweetForm";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TweetForm" element={<TweetForm />} />
      </Routes>
    </main>
  );
};

export default Main;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import TweetForm from "./TweetForm";
import Login from "./Login";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Feed" element={<Home />} />
        <Route path="/TweetForm" element={<TweetForm />} />
      </Routes>
    </main>
  );
};

export default Main;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [tweetList, setTweetList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/tweets").then(setTweetList);
  }, []);

  console.log(tweetList);
  return (
    <div className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <h1 className="py-4 text-gray-700">
            Bienvenue sur <span className="text-[#5651e5]">Wikit Tweet</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

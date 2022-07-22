import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Tweet from "./Tweet";

function toObject(searchParams) {
  const res = {};
  searchParams.forEach((value, key) => (res[key] = value));
}
const Home = () => {
  const [tweetList, setTweetList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/tweets/?${searchParams}`, config)
      .then((res) => setTweetList(res.data));
  }, [searchParams, config]);

  return (
    <div className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-[50%] mx-auto p-2 flex justify-center items-center">
        <div>
          <h1 className="py-4 text-[#ACBFC2]">
            Bienvenue sur <span className="text-[#F19333]">Wikit Tweet</span>
          </h1>
        </div>
      </div>
      <form>
        <label>Recherche par pseudo : </label>
        <input
          type="text"
          className="rounded-xl w-[30%] p-2 bg-[#ACBFC2]"
          value={searchParams.get("author") || ""}
          onChange={(e) =>
            setSearchParams({
              ...toObject(searchParams),
              author: e.target.value,
            })
          }
        />
      </form>
      {tweetList.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Home;

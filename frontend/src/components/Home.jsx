import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import moment from "moment";

const Home = () => {
  const [tweetList, setTweetList] = useState([]);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tweets?author=${author}`)
      .then((res) => setTweetList(res.data));
  }, [author]);

  // function handleDelete(e) {
  //   e.preventDefault();
  //   axios.delete(`http://localhost:3001/tweets/`);
  // }

  return (
    <div className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-[50%] mx-auto p-2 flex justify-center items-center">
        <div>
          <h1 className="py-4 text-gray-700">
            Bienvenue sur <span className="text-[#53B6F9]">Wikit Tweet</span>
          </h1>
        </div>
      </div>
      <form>
        <label>Recherche par pseudo : </label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option key={""} value={""}></option>
          {tweetList.map((tweet) => (
            <option key={tweet.id} value={tweet.author}>
              {tweet.author}
            </option>
          ))}
        </select>
      </form>
      {tweetList.map((tweet) => (
        <div
          className="p-6 w-[75%] mx-auto my-2 shadow-xl rounded-xl hover:scale-105 ease-in duration-300 bg-white"
          key={tweet.id}
        >
          <div className="flex justify-between border-b border-gray-300 my-4">
            <h3 className="text-[#53B6F9]">{tweet.author}</h3>
            <div className="cursor-pointer">
              <BsTrash />
            </div>
          </div>
          <h4 className="my-10">{tweet.content}</h4>
          <div className="flex justify-between border-t border-gray-300 my-4">
            <div>{tweet.likes}</div>
            <div>{moment(tweet.post_date).format("DD-MM-YYY")}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

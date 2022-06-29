import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import moment from "moment";
import { AiOutlineClose } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

function toObject(searchParams) {
  const res = {};
  searchParams.forEach((value, key) => (res[key] = value));
}
const Home = () => {
  const [tweetList, setTweetList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tweets/?${searchParams}`)
      .then((res) => setTweetList(res.data));
  }, [searchParams]);

  function handleDelete(id) {
    const idString = id.toString();
    axios
      .delete(`http://localhost:3001/tweets/${idString}`)
      .then(() => setTweetList(tweetList.filter((tweet) => tweet.id !== id)));
    setPopup(!popup);
  }
  console.log(id);
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
        <input
          type="text"
          className="rounded-xl w-[30%] p-2"
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
        <div
          className="p-6 w-[75%] mx-auto my-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300 bg-white"
          key={tweet.id}
        >
          <div className="flex justify-between border-b border-gray-300 my-4">
            <h3 className="text-[#53B6F9]">{tweet.author}</h3>
            <div
              className="cursor-pointer"
              onClick={() => {
                setPopup(!popup);
                setId(tweet.id);
              }}
            >
              <BsTrash />
            </div>
          </div>
          <h4 className="my-10">{tweet.content}</h4>
          <div className="flex justify-end border-t border-gray-300 my-4">
            <div>{moment(tweet.post_date).format("DD-MM-YYYY")}</div>
          </div>
        </div>
      ))}
      <div
        className={
          popup ? "fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            popup
              ? "mx-auto my-40 w-[50%] h-[50%] bg-[#ecf0f3] p-10 ease-in duration-500 rounded-xl"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-between">
            <h3>Supprimer</h3>
            <div
              className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              onClick={() => setPopup(!popup)}
            >
              <AiOutlineClose />
            </div>
          </div>
          <div className="my-20">
            Etes-vous sûr de vouloir suppimer ce tweet ?
          </div>
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="w-[30%] h-[30px] mx-auto flex justify-evenly text-[#ecf0f3] shadow-xl shadow-gray-400 rounded-xl bg-[#53B6F9]"
              onClick={() => handleDelete(id)}
            >
              Supprimer
            </button>
            <button
              type="submit"
              className="w-[30%] h-[30px] mx-auto flex justify-evenly text-[#53B6F9] shadow-xl shadow-gray-400 rounded-xl bg-[#ecf0f3]"
              onClick={() => setPopup(!popup)}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

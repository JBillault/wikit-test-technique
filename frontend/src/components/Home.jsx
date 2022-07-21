import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BsTrash, BsPencil } from "react-icons/bs";
import moment from "moment";
import { AiOutlineClose } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { TokenContext } from "../context/tokenContext";

function toObject(searchParams) {
  const res = {};
  searchParams.forEach((value, key) => (res[key] = value));
}
const Home = () => {
  const [tweetList, setTweetList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupPacth, setPopupPatch] = useState(false);
  const [id, setId] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState("");
  const tokenShare = useContext(TokenContext);
  let config = {
    headers: {
      Authorization: "Bearer " + tokenShare.token,
    },
  };
 // console.log("token", tokenShare.token);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/tweets/?${searchParams}`, config)
      // .then((res) => console.log(res));
      .then((res) => setTweetList(res.data));
  }, [searchParams, config]);

  function handleDelete(id) {
    const idString = id.toString();
    axios
      .delete(`http://localhost:3001/tweets/${idString}`, config)
      .then(() => setTweetList(tweetList.filter((tweet) => tweet.id !== id)));
    setPopup(!popup);
  }

  function handlePatch(e, id) {
    const idString = id.toString();
    axios
      .put(`http://localhost:3001/tweets/${idString}`, config, {
        content,
      })
      .then(() => {
        setContent("");
      })
      .then(() => {
        axios
          .get(`http://localhost:3001/tweets/`, config)
          .then((res) => setTweetList(res.data));
      });
  }
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
        <div
          className="p-6 w-[75%] mx-auto my-4 shadow-xl rounded-xl hover:scale-105 ease-in duration-300 bg-[#ACBFC2]"
          key={tweet.id}
        >
          <div className="flex justify-between border-b border-gray-300 my-4">
            <h3 className="text-[#F19333]">{tweet.author}</h3>
            <div className="flex">
              <div
                className="mx-3 cursor-pointer"
                onClick={() => {
                  setId(tweet.id);
                  setPopupPatch(!popupPacth);
                }}
              >
                <BsPencil size={20} />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setPopup(!popup);
                  setId(tweet.id);
                }}
              >
                <BsTrash size={20} />
              </div>
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
              ? "mx-auto my-40 w-[50%] h-[50%] bg-[#ACBFC2] p-10 ease-in duration-500 rounded-xl"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-between">
            <h3>Supprimer</h3>
            <div
              className="p-3 cursor-pointer"
              onClick={() => setPopup(!popup)}
            >
              <AiOutlineClose size={25} style={{ color: "#F19333" }} />
            </div>
          </div>
          <div className="my-20">
            Etes-vous sûr de vouloir suppimer ce tweet ?
          </div>
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="w-[30%] h-[30px] mx-auto flex justify-evenly text-[#1D2723] shadow-xl shadow-[#1D2723] rounded-xl bg-[#F19333]"
              onClick={() => handleDelete(id)}
            >
              Supprimer
            </button>
            <button
              type="submit"
              className="w-[30%] h-[30px] mx-auto flex justify-evenly text-[#F19333] shadow-xl shadow-gray-400 rounded-xl bg-[#4C6769]"
              onClick={() => setPopup(!popup)}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          popupPacth ? "fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            popupPacth
              ? "mx-auto my-40 w-[50%] h-[50%] bg-[#ACBFC2] p-10 ease-in duration-500 rounded-xl"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-between">
            <h3>Modifier</h3>
            <div
              className="p-3 cursor-pointer"
              onClick={() => setPopupPatch(!popupPacth)}
            >
              <AiOutlineClose size={25} style={{ color: "#F19333" }} />
            </div>
          </div>
          <form>
            <div className="my-4">
              <label htmlFor="content" className="font-bold">
                Votre tweet :
              </label>
            </div>
            <div className="my-4">
              <textarea
                id="content"
                className="rounded-xl w-[50%] h-[100px] p-2 bg-[#4C6769]"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </form>
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="w-[30%] h-[30px] mx-auto flex justify-evenly text-[#1D2723] shadow-xl shadow-[#1D2723] rounded-xl bg-[#F19333]"
              onClick={(e) => {
                handlePatch(e, id);
                setPopupPatch(!popupPacth);
              }}
            >
              Valider
            </button>
            <button
              type="submit"
              className="w-[30%] h-[30px] mx-auto flex justify-evenly text-[#F19333] shadow-xl shadow-gray-400 rounded-xl bg-[#4C6769]"
              onClick={() => setPopupPatch(!popupPacth)}
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

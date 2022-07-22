import React, { useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import moment from "moment";
import axios from "axios";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";

export default function Tweet({ tweet }) {
  const [id, setId] = useState();
  const [popup, setPopup] = useState(false);
  const [popupPacth, setPopupPatch] = useState(false);
  const [modifiedTweet, setModifiedTweet] = useState(tweet);
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  function handlePatch(e, id) {
    e.preventDefault();
    const idString = id.toString();
    axios
      .patch(
        `http://localhost:3001/tweets/${idString}`,
        {
          content: modifiedTweet.content,
        },
        config
      )
      .then(() => setPopupPatch(!popupPacth))
      .then(() => {
        setModifiedTweet("");
      });
  }

  function handleDelete(id) {
    const idString = id.toString();
    axios.delete(`http://localhost:3001/tweets/${idString}`, config);
    setPopup(!popup);
  }

  return (
    <>
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
        {popupPacth ? (
          <form onSubmit={handlePatch}>
            <input
              type="text"
              id="content"
              className="rounded-xl w-[50%] p-2 bg-[#4C6769] text-[#ACBFC2]"
              required
              value={modifiedTweet.content || ""}
              onChange={(e) =>
                setModifiedTweet({ ...tweet, content: e.target.value })
              }
            />
            <button type="submit" onClick={(e) => handlePatch(e, id)}>
              <TiTickOutline size={25} />
            </button>
          </form>
        ) : (
          <h4 className="my-10">{tweet.content}</h4>
        )}
        <div className="flex justify-end border-t border-gray-300 my-4">
          <div>{moment(tweet.post_date).format("DD-MM-YYYY")}</div>
        </div>
      </div>
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
    </>
  );
}

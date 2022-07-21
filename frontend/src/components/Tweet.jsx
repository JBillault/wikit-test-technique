import React, { useState, useContext } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import moment from "moment";
import axios from "axios";
import { TiTickOutline } from "react-icons/ti";
import { TokenContext } from "../context/tokenContext";

export default function Tweet({ tweet }) {
  const [id, setId] = useState();
  const [popup, setPopup] = useState(false);
  const [popupPacth, setPopupPatch] = useState(false);
  const [modifiedTweet, setModifiedTweet] = useState(tweet);
  const tokenShare = useContext(TokenContext);
  let config = {
    headers: {
      Authorization: "Bearer " + tokenShare.token,
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

  return (
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
  );
}

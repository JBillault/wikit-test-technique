import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import wikit from "../assets/logo-wikit.png";
import astronaut from "../assets/astronaute.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router";

const Header = () => {
  let navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  function handleLogOut() {
    localStorage.setItem("token", "");
    navigate("../", { replace: true });
  }
  return (
    <div className="fixed w-full h-20 shadow-xl z-[100]">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <img src={astronaut} alt="logo-wikit" style={{ height: "80px" }} />
        <div>
          <ul className="hidden md:flex">
            <NavLink to="/Feed">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Fil d'Actualité
              </li>
            </NavLink>
            <NavLink to="/TweetForm">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Ajouter un tweet
              </li>
            </NavLink>
            <NavLink to="/" onClick={() => handleLogOut()}>
              <li className="ml-10 text-sm uppercase hover:border-b">
                Log out
              </li>
            </NavLink>
          </ul>
          <div className="md:hidden cursor-pointer" onClick={handleNav}>
            <AiOutlineMenu size={25} style={{ color: "#F19333" }} />
          </div>
        </div>
      </div>
      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "fixed right-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#4C6769] p-10 ease-in duration-500"
              : "fixed right-[-150%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-between">
            <img src={astronaut} alt="logo-wikit" style={{ height: "80px" }} />
            <div className="p-3 cursor-pointer" onClick={handleNav}>
              <AiOutlineClose size={25} style={{ color: "#F19333" }} />
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <p className="w-[85%] md:w-[90%] py-4">{`Mieux vaut ne rien dire et passer pour un con que l'ouvrir et ne laisser aucun doute à ce sujet.`}</p>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <NavLink to="/Feed" onClick={() => setNav(!nav)}>
                <li className="py-4 text-sm">Fil d'Actualité</li>
              </NavLink>
              <NavLink to="/TweetForm" onClick={() => setNav(!nav)}>
                <li className="py-4 text-sm">Ajouter un tweet</li>
              </NavLink>
              <NavLink
                to="/"
                onClick={() => {
                  setNav(!nav);
                  handleLogOut();
                }}
              >
                <li className="py-4 text-sm">Log out</li>
              </NavLink>
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#5651e5]">{`Let's Connect`}</p>
              <div className="flex items-center justify-evenly my-4 w-full sm:w-[80%]">
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <a
                    href="https://www.linkedin.com/in/jonathan-billault/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <a
                    href="https://github.com/JBillault"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

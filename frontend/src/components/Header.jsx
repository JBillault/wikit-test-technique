import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import wikit from "../assets/logo-wikit.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Header = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="fixed w-full h-20 shadow-xl z-[100]">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <img src={wikit} alt="logo-wikit" style={{ height: "70px" }} />
        <div>
          <ul className="hidden md:flex">
            <NavLink to="/">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Accueil
              </li>
            </NavLink>
            <NavLink to="/TweetForm">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Ajouter un tweet
              </li>
            </NavLink>
          </ul>
          <div className="md:hidden cursor-pointer" onClick={handleNav}>
            <AiOutlineMenu size={25} />
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
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-between">
            <img src={wikit} alt="logo-wikit" style={{ height: "70px" }} />
            <div
              className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              onClick={handleNav}
            >
              <AiOutlineClose />
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <p className="w-[85%] md:w-[90%] py-4">{`Let's build something together`}</p>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <NavLink to="/">
                <li className="py-4 text-sm">Accueil</li>
              </NavLink>
              <NavLink to="/TweetForm">
                <li className="py-4 text-sm">Ajouter un tweet</li>
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

import React, { useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Login() {
  let navigate = useNavigate();
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [pseudoSignUp, setPseudoSignUp] = useState("");

  const getUser = async (email) => {
    await axios
      .get("http://localhost:3001/user/email", { email })
      .then((res) => console.log(email, res));
  };

  async function handleConnection(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3001/user/login", {
          email: emailSignIn,
          password: passwordSignIn,
        })
        .then((res) => res.data)
        .then((data) => localStorage.setItem("token", data.token))
        .then(() => {
          setEmailSignIn("");
          setPasswordSignIn("");
        })
        .then(() => navigate("../Feed", { replace: true }));
    } catch {
      navigate("../", { replace: true });
    }
  }

  useEffect(() => {
    getUser(emailSignIn);
  }, [emailSignIn]);

  function handleSingUp(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user", {
        pseudo: pseudoSignUp,
        email: emailSignUp,
        password: passwordSignUp,
      })
      .then((res) => console.log(res));
  }

  return (
    <div className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-[80%] mx-auto p-2 flex justify-evenly">
        <div className="mt-24">
          <h2 className="py-4 text-[#ACBFC2]">Connexion</h2>
          <form onSubmit={handleConnection}>
            <div className="my-4">
              <label htmlFor="emailSignIn" className="font-bold">
                Email :
              </label>
            </div>
            <div className="my-4">
              <input
                type="email"
                id="emailSignIn"
                required
                className="rounded-xl p-2 bg-[#ACBFC2]"
                value={emailSignIn}
                onChange={(e) => setEmailSignIn(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label htmlFor="passwordSignIn" className="font-bold">
                Mot de passe :
              </label>
            </div>
            <div className="my-4">
              <input
                type="password"
                id="passwordSignIn"
                required
                className="rounded-xl p-2 bg-[#ACBFC2]"
                value={passwordSignIn}
                onChange={(e) => setPasswordSignIn(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full mx-auto flex justify-evenly text-[#1D2732] shadow-xl shadow-[#1D2723] rounded-xl bg-[#F19333] py-1 my-8"
            >
              <FaUserAstronaut className="my-auto" />
              <p>Connexion</p>
            </button>
          </form>
        </div>
        <div className="mt-24">
          <h2 className="py-4 text-[#ACBFC2]">Créer un compte</h2>
          <form onSubmit={handleSingUp}>
            <div className="my-4">
              <label htmlFor="pseudo" className="font-bold">
                Pseudo :
              </label>
            </div>
            <div className="my-4">
              <input
                type="text"
                id="pseudo"
                required
                className="rounded-xl p-2 bg-[#ACBFC2]"
                value={pseudoSignUp}
                onChange={(e) => setPseudoSignUp(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label htmlFor="emailSignUp" className="font-bold">
                Email :
              </label>
            </div>
            <div className="my-4">
              <input
                type="email"
                id="emailSignUp"
                required
                className="rounded-xl p-2 bg-[#ACBFC2]"
                value={emailSignUp}
                onChange={(e) => setEmailSignUp(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label htmlFor="passwordSignUp" className="font-bold">
                Mot de passe :
              </label>
            </div>
            <div className="my-4">
              <input
                type="password"
                id="passwordSignUp"
                required
                className="rounded-xl p-2 bg-[#ACBFC2]"
                value={passwordSignUp}
                onChange={(e) => setPasswordSignUp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mx-auto w-[68%] flex justify-evenly text-[#1D2732] shadow-xl shadow-[#1D2723] rounded-xl bg-[#F19333] py-1 my-8"
            >
              <FaUserAstronaut className="my-auto" />
              <p>Créer commpte</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [userExists,setUserExists]=useState('')

  const router=useRouter()

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields should be filled");
      return;
    }

    const userExists = await axios.post("api/userExists/", { email });

    if (userExists.data?._id) {
      setError("User already exists");
    } else {
      const data = { name, email, password };
      console.log(data);

      const res = await axios.post("api/register/", data);

      if (res.status == 200) {
        router.push('/login')
        setName("");
        setEmail("");
        setPassword("");
        setError("");
      } else {
        console.log("error occured");
      }
    }
  };

  return (
    <div
      className="grid place-items-center h-screen w-screen"
      style={{ backgroundColor: "#202024" }}
    >
      <div
        className="shadow-lg p-5 w-[40%] rounded-lg  border-t-8 border-white"
        style={{ backgroundColor: "#29292D" }}
      >
        <h1 className="font-bold my-4 text-white text-xl">Registration</h1>
        <form onSubmit={handleRegistration} className="flex flex-col gap-3">
          <input
            id="form-input"
            value={name}
            type="text"
            placeholder="Full Name"
            onChange={(ev) => setName(ev.target.value)}
          ></input>
          <input
            id="form-input"
            value={email}
            type="text"
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
          ></input>
          <input
            id="form-input"
            value={password}
            type="password"
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
          ></input>
          <button
            type="submit"
            className="border border-black text-white font-bold py-2 px-6 cursor-pointer"
          >
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link className="text-sm text-white mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

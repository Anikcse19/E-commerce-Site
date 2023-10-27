/* eslint-disable react-hooks/rules-of-hooks */
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Nav from "./Nav";

const layout = ({ children }) => {
  
  const [showNav,setShowNav]=useState(false)
  const { data: session } = useSession();

  console.log(session);
  if (!session) {
    return (
      <div className="bg-blue-200 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => {
              signIn("google");
            }}
            className=" bg-white text-base border-l-purple-900 p-4 rounded hover:opacity-80"
          >
            Log in with Google
          </button>
        </div>
      </div>
    );
  } else if (session) {
    return (
      <div className="bg-gray-200 min-h-screen flex">
        <Nav showNav={showNav} />
        <div className="p-2 block md:hidden">
          <button onClick={()=>setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

          </button>
        </div>
        <div className="bg-white flex-grow m-2 rounded-md p-2">
          <div>
             {children}
          </div>
        </div>
      </div>
    );
  }
};

export default layout;

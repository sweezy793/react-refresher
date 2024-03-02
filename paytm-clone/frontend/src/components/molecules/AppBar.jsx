import React from "react";
import { Link } from "react-router-dom";

const AppBar = ({ username }) => {
  return (
    <div className="shadow h-14 flex justify-between">
      <Link
        className="flex flex-col justify-center h-full ml-4 font-semibold"
        to="/dashboard"
      >
        SastaTM
      </Link>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {username.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;

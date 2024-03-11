import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const { finalScore, totalScore } = state;
  return (
    <div className="bg-stone-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-slate-50 rounded-xl w-auto text-center p-20 h-max drop-shadow-xl">
          <p className="text-6xl">
            <span className="font-bold">{localStorage.getItem("name")}</span>{" "}
            you scored{" "}
          </p>
          <p className="text-8xl font-semibold">
            {finalScore}/{totalScore}
            <span>{finalScore < 6 ? "😓" : "🚀"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;

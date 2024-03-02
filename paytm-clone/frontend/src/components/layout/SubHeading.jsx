import React from "react";

const SubHeading = ({ text }) => {
  return (
    <div>
      <p className="text-slate-600 text-lg text-center pt-1 px-4 pb-4">
        {text}
      </p>
    </div>
  );
};

export default SubHeading;

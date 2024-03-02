import React from "react";

const InputBox = ({ label, placeholder, type, onChange }) => {
  return (
    <div>
      <p className="text-sm font-medium text-left py-2">{label}</p>
      <input
        className="w-full p-1 border-2 rounded-md"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;

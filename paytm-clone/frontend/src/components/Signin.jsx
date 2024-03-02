import React, { useState } from "react";
import Heading from "./layout/Heading";
import SubHeading from "./layout/SubHeading";
import InputBox from "./layout/InputBox";
import Button from "./layout/Button";
import BottomWarning from "./layout/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signinHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username: email,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading text={"Sign In"} />
          <SubHeading text="Enter your credentials to access your account" />
          <InputBox
            label="Email"
            placeholder="abc@gmail.com"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            label="Password"
            placeholder="123456"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button text="Sign In" onClick={signinHandler} />
          </div>
          <div className="pb-4">
            <BottomWarning
              text="Don't have an account?"
              link="Sign Up"
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

import React, { useState } from "react";
import Heading from "./layout/Heading";
import SubHeading from "./layout/SubHeading";
import InputBox from "./layout/InputBox";
import Button from "./layout/Button";
import BottomWarning from "./layout/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SignupHandler = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }
    );
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading text={"Sign Up"} />
          <SubHeading text="Enter your information to create an account" />
          <InputBox
            label="First Name"
            placeholder="John"
            type="text"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <InputBox
            label="Last Name"
            placeholder="Doe"
            type="text"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
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
            <Button text="Sign Up" onClick={SignupHandler} />
          </div>
          <div className="pb-4">
            <BottomWarning
              text="Already have an account?"
              link="Sign In"
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

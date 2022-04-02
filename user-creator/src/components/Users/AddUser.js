import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const addUserHandler = (event) => {
    event.preventDefault();
    if (username.trim().length == 0 || age.length == 0) {
      setError({
        title: "Invalid Input",
        message: "Please Enter Valid name and age(non-empty values)",
      });
      return;
    }
    if (age < 1) {
      setError({
        title: "Invalid Age",
        message: "Please Enter Valid age(>0)",
      });
      return;
    }
    console.log(username, age);
    props.onAddUser(username, age);
    setUsername("");
    setAge("");
  };
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  let errorDiv;
  if (error) {
    errorDiv = (
      <ErrorModal
        title={error.title}
        message={error.message}
        onConfirm={errorHandler}
      />
    );
  }
  return (
    <div>
      {errorDiv}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            onChange={usernameChangeHandler}
            id="username"
            type="text"
            value={username}
          ></input>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={age}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;

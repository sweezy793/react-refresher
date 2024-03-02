import React from "react";
import AppBar from "./molecules/AppBar";
import Balance from "./molecules/Balance";
import Users from "./molecules/Users";

const Dashboard = () => {
  return (
    <div>
      <AppBar username={"Sarthak"} />
      <div className="p-2">
        <Balance value={"10000"} />
      </div>
      <div className="p-2">
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;

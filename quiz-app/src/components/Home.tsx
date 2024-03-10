import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const buttonHandler = () => {
    if (!name || !email) {
      alert("Please enter all fields");
      return;
    }
    navigate("/questions");
  };
  return (
    <div className="bg-stone-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-slate-50 rounded-xl w-auto text-center p-4 h-max drop-shadow-xl">
          <h1 className="font-bold text-3xl mb-4 mt-2">Enter your details</h1>
          <div className="mt-2 mb-4">
            <p className="text-left font-semibold px-6">Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-2 border-black border-2 rounded-xl m-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <p className="text-left px-6 font-semibold">Email</p>
            <input
              type="text"
              placeholder="Enter your email"
              className="p-2 border-black border-2 rounded-xl m-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              className="p-3 bg-black text-white rounded-xl m-2 hover:bg-slate-800"
              onClick={buttonHandler}
            >
              Start Quiz!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

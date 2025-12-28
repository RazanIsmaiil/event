import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/login", state)
      .then((res) => {
        alert(`Welcome ${res.data.name}`);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>

        <input
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

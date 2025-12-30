import React, { useState } from "react";
import axios from "axios";
import { API } from "../config";
const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(`${API}/signup`, state)
      .then(() => {
        alert("Signup successful");
        setState({ name: "", email: "", password: "" });
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Signup</h2>

        <input
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

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
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;

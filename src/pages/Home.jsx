import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to EventMaster
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Discover, create, and join amazing events around the world.
      </p>

      <Link
        to="/events"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        View Events
      </Link>
    </div>
  );
};

export default Home;

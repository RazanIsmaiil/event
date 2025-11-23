import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h1>

      <form className="bg-white shadow p-6 rounded-lg max-w-lg">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-2 rounded mb-4"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded mb-4"
        />
        <textarea
          placeholder="Message"
          className="w-full border p-2 rounded mb-4"
          rows="4"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;

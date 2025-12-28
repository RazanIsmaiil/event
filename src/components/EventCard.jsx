import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event, remove }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 border hover:shadow-xl transition relative">
      <h2 className="text-xl font-bold text-blue-600">{event.title}</h2>
      <p className="text-gray-700 mt-2">📅 {event.date}</p>
      <p className="text-gray-700">📍 {event.location}</p>

      <Link
        to={`/events/${event.id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </Link>

      {remove && (
        <button
          onClick={() => remove(event.id)}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default EventCard;


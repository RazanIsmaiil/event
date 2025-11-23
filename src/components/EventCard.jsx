import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 border hover:shadow-xl transition">
      <h2 className="text-xl font-bold text-blue-600">{event.title}</h2>
      <p className="text-gray-700 mt-2">📅 {event.date}</p>
      <p className="text-gray-700">📍 {event.location}</p>

      <Link
        to={`/events/${event.id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;

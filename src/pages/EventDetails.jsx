import React from "react";
import { useParams } from "react-router-dom";
import events from "../data/events";

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event)
    return <h2 className="text-center text-red-500 mt-20">Event not found</h2>;

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-blue-600">{event.title}</h1>

      <div className="mt-6 bg-white shadow p-6 rounded-lg">
        <p className="text-gray-700 text-lg">📅 {event.date}</p>
        <p className="text-gray-700 text-lg">📍 {event.location}</p>

        <p className="mt-4 text-gray-800 leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;

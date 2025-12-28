
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Event not found");
      });
  }, [id]);

  if (error)
    return (
      <h2 className="text-center text-red-500 mt-20">{error}</h2>
    );

  if (!event)
    return (
      <h2 className="text-center text-gray-500 mt-20">
        Loading...
      </h2>
    );

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-blue-600">
        {event.title}
      </h1>

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

import React from "react";
import events from "../data/events";
import EventCard from "../components/EventCard";

const Events = () => {
  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">All Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;

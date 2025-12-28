import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const Events = () => {
  // state للأحداث
  const [events, setEvents] = useState([]);

  // state للنموذج الجديد
  const [state, setState] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  // جلب كل الأحداث من backend عند التحميل
  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  // handle input
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // إضافة حدث جديد
  const addEvent = () => {
    if (!state.title || !state.description || !state.date || !state.location) {
      alert("All fields are required");
      return;
    }

    axios
      .post("http://localhost:5000/events", state)
      .then((res) => {
        alert("Event added successfully");
        setEvents([...events, { ...state, id: Math.random() }]); // مؤقتاً لإظهار الفورم فوراً
        setState({ title: "", description: "", date: "", location: "" }); // إعادة ضبط الفورم
      })
      .catch((err) => console.log(err));
  };

  // حذف حدث
  const remove = (id) => {
    axios
      .delete(`http://localhost:5000/events/${id}`)
      .then(() => {
        setEvents(events.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">All Events</h1>

      {/* Form إضافة حدث */}
      <div className="mb-6 border p-4 rounded">
        <input
          name="title"
          value={state.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          value={state.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-2"
        />
        <input
          type="date"
          name="date"
          value={state.date}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="location"
          value={state.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={addEvent}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      {/* عرض الأحداث باستخدام EventCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} remove={remove} />
        ))}
      </div>
    </div>
  );
};

export default Events;


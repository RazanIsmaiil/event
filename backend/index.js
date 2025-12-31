import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

app.use(express.json());


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "projectweb2",
  port: Number(process.env.MYSQL_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
});


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.get("/events", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM events");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM events WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).send("Event not found");

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post("/events", async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location)
      return res.status(400).send("All fields required");

    const [result] = await pool.query(
      "INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)",
      [title, description, date, location]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.put("/events/:id", async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const [result] = await pool.query(
      "UPDATE events SET title=?, description=?, date=?, location=? WHERE id=?",
      [title, description, date, location, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).send("Event not found");

    res.send("Event updated successfully");
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM events WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).send("Event not found");

    res.send("Event deleted successfully");
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// AUTH
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).send("All fields are required");

    const hashedPassword = bcrypt.hashSync(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).send("User registered successfully");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).send("Email already exists");

    res.status(500).json({ error: String(err) });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("All fields are required");

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0)
      return res.status(404).send("User not found");

    const isMatch = bcrypt.compareSync(password, rows[0].password);

    if (!isMatch)
      return res.status(401).send("Invalid password");

    res.json({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

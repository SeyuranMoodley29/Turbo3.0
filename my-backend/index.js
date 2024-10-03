const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Seyuranm8",
  port: 5432,
});

// Route to save data
app.post("/api/save", async (req, res) => {
  const { title, date } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO your_table_name (title, date) VALUES ($1, $2) RETURNING *",
      [title, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data to database");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Route to get all data
app.get("/api/data", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM your_table_name");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    }
  });
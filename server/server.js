import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
console.log("DB_URL:", process.env.DB_URL);

const { Client } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection (Supabase)
const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect DB
async function initDatabase() {
  try {
    await client.connect();
    console.log("✅ Connected to Supabase");

    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        userId VARCHAR(255) PRIMARY KEY,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL
      )
    `);

    console.log("✅ Users table ready");
  } catch (error) {
    console.error("❌ DB error:", error);
    process.exit(1);
  }
}

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'CineVerse API running' });
});

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { userId, name, password, email, phone } = req.body;

    // Check existing user
    const result = await client.query(
      'SELECT * FROM users WHERE userId=$1 OR email=$2',
      [userId, email]
    );

    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query(
      'INSERT INTO users (userId, name, password, email, phone) VALUES ($1,$2,$3,$4,$5)',
      [userId, name, hashedPassword, email, phone]
    );

    res.json({ message: 'Registration successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await client.query(
      'SELECT * FROM users WHERE userId=$1 OR email=$2',
      [username, username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        userId: user.userid,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 3001;

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
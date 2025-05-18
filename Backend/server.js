require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const session = require('express-session');

const ChatBot = require('../Database/Models/Users');
const History = require('../Database/Models/History');

const app = express();
const path = require('path');

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'Rushil',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

const auth = (req, res, next) => {
  if (req.session.user) next();
  else return res.status(401).json({ message: 'Unauthorized. Please login first.' });
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await ChatBot.findOne({ username: email });
    if (user && user.password === password) {
      req.session.user = { email: user.username, id: user._id, score: user.score };
      return res.json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await ChatBot.findOne({ username: email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = new ChatBot({ username: email, password, score: 0 });
    await newUser.save();
    req.session.user = { email: newUser.username, id: newUser._id, score: newUser.score };
    res.json({ message: 'Registration successful' });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// === Gemini & Hugging Face Setup ===
const API_KEY = process.env.API_KEY;
const HF_TOKEN = process.env.HF_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const HF_MODEL = 'facebook/bart-large-mnli';

async function classify(text, user) {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        inputs: text,
        parameters: { candidate_labels: ['Knowledge-Based', 'Not Knowledge-Based'] },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const scores = response.data?.scores;
    if (!scores || typeof scores[0] !== 'number') return;

    const adjustedScore = (scores[0] * 100) / 115;
    if (adjustedScore > 0.50) user.score += 1;
    else if (adjustedScore < 0.4) user.score -= 1;

    if (typeof user.score !== 'number' || isNaN(user.score)) user.score = 0;
    await user.save();
  } catch (error) {
    console.error('Hugging Face classification error:', error.response?.data || error.message);
  }
}

async function generateQuizFromText(text) {
  try {
    const prompt = `Generate a short multiple choice quiz (2-3 questions) based on the following text:\n\n${text}\n\nFormat the quiz like this:\nQ1: ...?\nA. ...\nB. ...\nC. ...\nAnswer: ...`;

    const response = await axios.post(
      `${GEMINI_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No quiz generated.";
  } catch (err) {
    console.error("Quiz generation error:", err.response?.data || err.message);
    return "Error generating quiz.";
  }
}

app.post("/ask-rpt", auth, async (req, res) => {
  try {
    const prompt = req.body.prompt || "Hello, Gemini!";
    const userEmail = req.session.user.email;

    const user = await ChatBot.findOne({ username: userEmail });
    if (!user) return res.status(404).json({ error: "User not found in DB" });

    // Generate main Gemini response
    const geminiRes = await axios.post(
      `${GEMINI_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const geminiText = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

    // Save to history
    const history = new History({
      Question: prompt,
      Output: geminiText,
      User: user._id
    });
    await history.save();

    // Classify the response for scoring
    await classify(geminiText, user);

    // Generate quiz
    const quiz = await generateQuizFromText(geminiText);
    console.log(quiz)

    res.json({
      message: "Success",
      answer: geminiText,
      quiz,
      saved: true
    });

  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.post('/history', auth, async (req, res) => {
  try {
    const userEmail = req.session.user.email;
    const user = await ChatBot.findOne({ username: userEmail });

    if (!user) return res.status(404).json({ message: "User not found" });

    const history = await History.find({ User: user._id });
    res.json({ message: "Prompt history fetched", history });
  } catch (err) {
    res.status(500).json({ message: "Error fetching history", error: err.message });
  }
});

app.get('/me', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get('/profile', auth, (req, res) => {
  res.json({ user: req.session.user });
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid', {
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: 'lax'
    });
    res.json({ message: 'Logged out' });
  });
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
# 🚀 AI-Powered Text Analysis & Quiz Generator API

This project is an Express.js-based backend that integrates **Google Gemini 1.5 Flash API** and **Hugging Face's BART Large MNLI model** to:
- Generate AI-powered responses from a given prompt
- Classify topics
- Create quizzes based on the generated content
- Store user and history data in MongoDB
- Authenticate users using sessions

---

## 📦 Features

- ✨ Generate responses using **Google Gemini 1.5 Flash**
- 🧠 Classify intent/topic using **Hugging Face BART Large MNLI**
- 📋 Generate quizzes from content
- 🗃️ Store user and history data in **MongoDB**
- 🔐 Session-based user authentication
- 🌐 Fully RESTful API with JSON responses

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **AI APIs:** 
  - Google Generative AI (Gemini 1.5 Flash)
  - Hugging Face Transformers (BART MNLI)
- **Database:** MongoDB
- **Authentication:** Express-session
- **Language:** TypeScript (recommended)

---

## 🔐 API Keys Required

You’ll need the following API keys:

### 1. 🔑 Google Generative AI (Gemini)
- Get it from: https://makersuite.google.com/app/apikey

env
GOOGLE_API_KEY=your_google_generative_ai_key
### 2. 🔑 HUGGING FACE
	- Get it from: https://huggingface.co/settings/tokens
env
HUGGINGFACE_API_KEY=your_hugging_face_api_key

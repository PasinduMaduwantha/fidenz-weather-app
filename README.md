🌦️ Weather App — TypeScript + Vite + TanStack Query

A modern full-stack Weather Application built with TypeScript, React (Vite), and Express.js, featuring secure Auth0 SSO + MFA authentication and real-time weather data from the OpenWeatherMap API.

🚀 Quick Start

1. Project Setup

If you’ve already executed the setup script:

bash setup-weather-app.sh

The script automatically generates the following structure:

weather-app/
├── backend/
│ ├── src/
│ ├── package.json
│ └── tsconfig.json
├── frontend/
│ ├── src/
│ ├── package.json
│ └── vite.config.ts
└── README.md

Otherwise, clone and enter the project manually:

git clone <repository-url>
cd weather-app

⚙️ 2. Configure Environment Variables

Create a .env file in the backend directory and a .env.local file in the frontend directory.

Backend (backend/.env)
PORT=5000
NODE_ENV=development

# Auth0 Configuration

AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://weather-api

# OpenWeatherMap API (DO NOT expose to client)

OPENWEATHER_API_KEY=your_openweather_api_key_here

# CORS & Cache Settings

FRONTEND_URL=http://localhost:5173
CACHE_DURATION=5

Frontend (frontend/.env.local)

# Auth0 Configuration

VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=https://weather-api

# Backend API URL

VITE_API_URL=http://localhost:5000/api

⚠️ Important:
Only variables prefixed with VITE\_ are exposed to the client.
Never expose secret keys like OPENWEATHER_API_KEY in the frontend.

🔑 3. Get OpenWeatherMap API Key

Go to OpenWeatherMap

Create a free account

Navigate to API Keys

Copy your key and paste it into the backend .env:

OPENWEATHER_API_KEY=your_api_key_here

🔐 4. Setup Auth0 (SSO + MFA)
Step-by-Step Setup

Create an Auth0 account:
Visit Auth0 Dashboard

Create a Regular Web Application

Configure Allowed URLs:

Allowed Callback URLs → http://localhost:5173

Allowed Logout URLs → http://localhost:5173

Create an API:

Identifier → https://weather-api

Signing Algorithm → RS256

Update .env and .env.local with your Auth0 credentials.

Enable Multi-Factor Authentication (MFA):

Go to Authentication → Multifactor Auth

Enable Email

Restrict Public Signup:

Go to Authentication → Sign-up

Disable “Allow anyone to sign up”

Create a Test User:

Email: careers@fidenz.com

Password: Pass#fidenz

🧩 5. Install Dependencies
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

▶️ 6. Run Development Servers
Start Backend (Terminal 1)
cd backend
npm run dev

Server: http://localhost:5000

Health check: http://localhost:5000/health

Start Frontend (Terminal 2)
cd frontend
npm run dev

App: http://localhost:5173

🧱 7. Code Structure & Documentation
Backend (Express + Auth0 + TypeScript)
backend/
├── src/
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Auth0 JWT validation
│ ├── routes/ # API routing definitions
│ ├── services/ # External APIs & caching logic
│ ├── types/ # Shared TypeScript interfaces
│ ├── data/ # Static data (cities)
│ └── server.ts # Express server entry point

Frontend (React + Vite + TanStack Query)
frontend/
├── src/
│ ├── components/ # UI Components (Login, WeatherCard, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── services/ # API handlers (axios)
│ ├── types/ # Type definitions
│ ├── App.tsx # Routing and layout
│ ├── main.tsx # Entry file
│ └── index.css # Tailwind styles

🧠 8. Clean Coding & Documentation

This project adheres to clean architecture and TypeScript best practices.

Highlights:

✅ Strong typing across backend and frontend

✅ Modular folder structure

✅ Clear separation of concerns

✅ Strict TypeScript compiler checks

✅ ESLint + Prettier formatting

✅ Reusable hooks and components

✅ JSDoc-style inline documentation

🧰 9. Tech Stack
Layer Technologies
Frontend React 18, TypeScript, Vite, TanStack Query, Tailwind CSS, Auth0 React
Backend Node.js, Express, TypeScript, Axios, Node-Cache, Auth0 JWT
Authentication Auth0 (SSO + MFA)
API Provider OpenWeatherMap
🏗️ 10. Build for Production
Backend
cd backend
npm run build
npm start

Frontend
cd frontend
npm run build
npm run preview

Included:
✅ Backend (TypeScript)
✅ Frontend (TypeScript + Vite)
✅ .env templates
✅ Documentation

🌈 Features

🔒 Auth0 SSO + MFA

🌍 Real-time Weather API

⚡ Vite + React + TypeScript

💾 Smart Caching (Node-Cache)

📱 Responsive UI with Tailwind

🔁 TanStack Query v5 (Data Caching)

🧱 Clean Architecture

📖 Detailed Documentation

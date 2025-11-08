# Weather App - TypeScript + Vite + TanStack Query

A modern, type-safe full-stack weather application with Auth0 authentication.

## 🚀 Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend (.env):**
- Update `AUTH0_DOMAIN` with your Auth0 tenant
- Update `AUTH0_AUDIENCE` with your API identifier
- Add your `OPENWEATHER_API_KEY`

**Frontend (.env):**
- Update `VITE_AUTH0_DOMAIN` with your Auth0 tenant
- Update `VITE_AUTH0_CLIENT_ID` with your client ID
- Update `VITE_AUTH0_AUDIENCE` with your API identifier

### 3. Start Development Servers

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

### 4. Access Application

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Backend Health: http://localhost:5000/health

## 🔐 Auth0 Setup

See full Auth0 configuration instructions in the documentation.

### Quick Steps:
1. Create SPA Application in Auth0
2. Configure callback URLs: `http://localhost:5173`
3. Create API with identifier: `https://weather-api`
4. Enable Email MFA
5. Disable public signups
6. Create test user: careers@fidenz.com / Pass#fidenz

## 📦 Features

✅ TypeScript (Frontend & Backend)
✅ Vite (Lightning-fast dev server)
✅ TanStack Query v5 (Smart caching)
✅ Auth0 Authentication + MFA
✅ Responsive Design
✅ Real-time Weather Data
✅ 5-minute Cache Strategy

## 🛠️ Tech Stack

**Backend:** Node.js, Express, TypeScript, Auth0, Axios, Node-cache
**Frontend:** React 18, TypeScript, Vite, TanStack Query, Auth0 React, Tailwind CSS

## 📝 Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📄 License

MIT

---

Built with ❤️ for Fidenz Technologies Assignment

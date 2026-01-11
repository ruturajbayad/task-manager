# Task Manager - Local Setup Guide

## Prerequisites

- Node.js (v16+)
- MongoDB (running locally)
- Create database named "task-manager"

## Setup Steps

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd client
npm install
```

### 2. Configure Environment Variables

**Server** (`server/.env`):
```env
PORT=4000
MONGODB_URL=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:5173
```

**Client** (`client/.env`):
```env
VITE_API_BASE_URL=http://localhost:4000
```

### 3. Run the Application

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

### 4. Access the App

Open your browser and navigate to: `http://localhost:5173`

---

That's it! Your task manager is now running locally.

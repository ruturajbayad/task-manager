import dotenv from "dotenv";
import connectDB from "../src/db/index.js";
import { app } from "../src/app.js";

dotenv.config();

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await connectDB();
    isConnected = true;
    console.log("New database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

// Vercel serverless function handler
export default async function handler(req, res) {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Configure CORS (frontend URL)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Middleware
app.use(clerkMiddleware());
app.use(express.json());

// ✅ Optional root route (for testing)
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend server is running!");
});

// ✅ API Routes
app.use("/webhooks", webhookRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// ✅ Global error handler
app.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

// ✅ Connect to MongoDB and start server
app.listen(3000, async () => {
  await connectDB();
  console.log("🚀 Server is running on port 3000!");
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";
import compression from 'compression';


dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(compression());



app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://chat-app-frontend-nu.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
  })
);


app.get("/", (req, res) => {
  res.status(200).send("API is running successfully!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

connectDB()
  .then(() => console.log('MongoDB connected at server startup'))
  .catch(err => console.error('Initial MongoDB connection failed:', err));

server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
});

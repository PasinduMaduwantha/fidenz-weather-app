import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("\n🌐 === INCOMING REQUEST ===");
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Authorization Header:", req.headers.authorization);

  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log("Token length:", token.length);
    console.log("Token parts:", token.split(".").length);
    console.log("First 50 chars:", token.substring(0, 50));
  }
  console.log("========================\n");

  next();
});

// Health check (no auth required)
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/weather", weatherRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
interface CustomError extends Error {
  status?: number;
  statusCode?: number;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // Log error details (in production, use proper logging service)
  console.error("Error:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Handle JWT/Auth errors
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or missing authentication token",
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
    });
  }

  // Generic error response
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `🔗 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
  );
  console.log(
    `🔒 CORS enabled for: ${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }`
  );
});

export default app;

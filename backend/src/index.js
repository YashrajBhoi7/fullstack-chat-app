import express from "express";
import dotenv from "dotenv"; // Load environment variables
import { connectDB } from "./lib/db.js"; // Import the DB connection function
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";  // Correct import for default export
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();


const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
})
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT:"+ PORT);
    connectDB();
});

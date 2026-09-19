import express from "express";
import multer from "multer";
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js";

const App = express();
const port = 8000;

//middleware
App.use(cors())
App.use(express.json())
App.use(multer().none())

App.get("/", (req, res) => {
  res.send("server is running");
});

await connectDB()

App.listen(port, () => {
  console.log("server running on port :: ", port);
});

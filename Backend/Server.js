import express from "express";

const App = express();
const port = 8000;

App.get("/", (req, res) => {
  res.send("server is running");
});

App.listen(port, () => {
  console.log("server running on port :: ", port);
});

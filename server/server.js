import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let inputs = { input1: "", input2: "" };

app.get("/api/inputs", (req, res) => {
  res.json(inputs);
});

app.post("/api/inputs", (req, res) => {
  inputs = req.body;
  res.json({ success: true });
});

app.listen(4005, () => console.log("started"));

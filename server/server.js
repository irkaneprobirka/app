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

const port = Number(process.env.PORT || 4005);
app.listen(port, "0.0.0.0", () => console.log("API listening on port " + port));

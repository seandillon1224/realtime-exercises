import express from "express";
import bodyParser from "body-parser";
import nanobuffer from "nanobuffer";
import morgan from "morgan";

// set up a limited array
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

// feel free to take out, this just seeds the server with at least one message
msg.push({
  user: "sean",
  text: "ok?",
  time: Date.now(),
});

// get express ready to run
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/poll", function (req, res) {
  res.json({
    msg: getMsgs(),
  });
  // use getMsgs to get messages to send back
  // write code here
});

app.post("/poll", function (req, res) {
  const { user, text } = req.body;
  msg.push({ user, text, time: Date.now() });
  res.json({
    status: "S'good",
  });
  // add a new message to the server
  // write code here
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);

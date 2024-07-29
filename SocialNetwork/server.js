const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/social_network", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const PostSchema = new mongoose.Schema({
  username: String,
  content: String,
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("User registered successfully");
  });
});

app.post("/login", (req, res) => {
  User.findOne(
    { username: req.body.username, password: req.body.password },
    (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send("User not found");
      res.status(200).send(user);
    }
  );
});

app.post("/posts", (req, res) => {
  const post = new Post(req.body);
  post.save((err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("Post created successfully");
  });
});

app.get("/posts", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(posts);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

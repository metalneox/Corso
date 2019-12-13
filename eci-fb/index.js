require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcrypt");
const authMiddleware = require("./authMiddleware");
const jwt = require("jsonwebtoken");
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.post("/auth/signup", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (user) {
    return res.sendStatus(400);
  }

  let hashPw;
  try {
    hashPw = bcrypt.hash(req.body.password, 10);
  } catch (e) {
    return res.sendStatus(400);
  }

  const newUser = await User.create({
    ...req.body,
    password: hashPw
  });

  return res.json({
    user: newUser,
    token: token
  });
});
app.post("/auth/login", async (req, res) => {
  const oldUser = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (!oldUser) {
    return res.sendStatus(403);
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.sendStatus(403);
  }

  const token = jwt.sign(
    {
      userId: user.id
    },
    process.env.HMAC_JWT_SECRET,
    {
      expiresIn: "30d"
    }
  );

  return res.json({
    user: oldUser,
    token: token
  });
});

app.use(authMiddleware);

app.get("/posts", async (req, res) => {
  const posts = await Post.findAll();
  return res.json(posts);
});
app.put("/posts/:postId", async (req, res) => {
  const oldPost = await Post.findOne({
    where: {
      id: req.params.postId,
      userId: req.user.id
    }
  });
  let updatedPost;
  if (oldPost) {
    updatedPost = await oldPost.update({
      ...req.body,
      userId: req.user.id
    });
  } else {
    updatedPost = await Post.create({
      ...req.body,
      userId: req.user.id
    });
  }

  return res.json(updatedPost);
});
app.delete("/posts/:postId", async (req, res) => {
  const post2delete = await Post.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  });

  if (post2delete) await post2delete.destroy();

  return res.sendStatus(200);
});
app.put("/users/edit", async (req, res) => {
  let hashPw;
  if (req.body.password) {
    try {
      hashPw = bcrypt.hash(req.body.password, 10);
    } catch (e) {
      return res.sendStatus(400);
    }
  }

  const user = await req.user.update({
    ...req.body,
    password: hashPw ? hashPw : req.user.password
  });

  return res.json(user);
});

app.listen(port, () => {
  console.log("Listening on port", port);
});

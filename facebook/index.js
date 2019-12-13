require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const validator = require("email-validator");
var jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");

const User = require("./models/User");
const Post = require("./models/Post");


const port = 3000;
const app = express();

const HMAC_JWT_SECRET = process.env.HMAC_JWT_SECRET;


//User.hasMany(Post); 


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//auth/signUp
//auth/login

app.post("/auth/signUp", async (req, res) => {
  if (!validator.validate(req.body.email)) {
    return res.status(400).json({
      error: "invalid_email"
    });
  }
  let hashPw;
  try {
    hashPw = await bcrypt.hash(req.body.password, 10);
  } catch (e) {
    return res.status(400);
  }
  if (
    await User.findOne({
      where: {
        email: req.body.email
      }
    })
  ) {
    return res.status(400).json({
      error: "email_already_exists"
    });
  }

  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashPw
  });
  const token = jwt.sign(
    {
      userId: user.id
    },
    HMAC_JWT_SECRET,
    {
      expiresIn: "10d"
    }
  );
  return res.json({
    user: user,
    token: token
  });
});

//Login
app.post("/auth/login", async (req, res) => {
          const user = await User.findOne({
              where: {
                email: req.body.email
              }
            })

          if(!user){
           return res.sendStatus(403); 
          }
          const match = await bcrypt.compare(req.body.password, user.password);
          if(match){
              const token = jwt.sign(
                {
                  userId: user.id
                },
                HMAC_JWT_SECRET,
                {
                  expiresIn: "10d"
                }
              );

              return res.json({
                user: user,
                token: token
              });
          }else{
            return res.sendStatus(403);
          }
});

//Login middleware
app.use(authMiddleware);

app.get("/posts",async (req,res) =>{
  if (req.query.name) {
    var where = {
      email: req.query.email
    };
  } else {
    var where = {};
  }
  const posts = await Post.findAll({
    where: where
  });
  return res.json(posts)
});


//id	title	text	fk_users	createdAt	updatedAt	deleteAt
app.post("/posts", async (req, res) => {
  let newPost = await Post.create({
    title: req.body.title,
    text: req.body.text,
    fk_users: req.user.id
  });
  return res.json(newPost);
});

/*
app.put("/posts/:idPost", async (req, res) => {
  let newPost = await Post.upsert({
    title: req.body.title,
    text: req.body.text,
    fk_user: req.user.id
  });
  return res.json(newPost);
});
*/

app.put('/posts/:idPost', async (req,res) => {
  const curPost = await Post.findOne({
    where: {
      id: req.params.idPost,
      fk_users : req.user.id
    }
  })
  if(curPost){
    let newPut = await curPost.update({
        id: req.params.idPost,
        ...req.body,
        fk_users: req.user.id
    });
    return res.json(newPut);
  }else{
    //copia fare un create
  }
})


app.delete("/posts/:idPost", async (req, res) => {
  const curPost = await Post.findOne({
    where: {
      id: req.params.idPost,
      fk_users : req.user.id
    }
  })
  if(curPost){
    await curPost.destroy();
  }
  return res.sendStatus(200);
});


app.listen(port, () => {
    console.log("Server listening on port", port);
})
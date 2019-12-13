require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const bodyParser = require("body-parser");
const Car = require("./models/Car");
const Fine = require("./models/Fine");
const User = require("./models/User");
const authMiddleware = require("./authMiddleware");
const PORT = 3000;
const app = express();

app.use(bodyParser.json());

function generateToken(userId) {
  return jwt.sign(
    {
      userId: userId
    },
    process.env.HMAC_JWT_SECRET,
    {
      expiresIn: "30d"
    }
  );
}

app.post("/auth/signup", async (req, res) => {
  if (!emailValidator.validate(req.body.email)) return res.sendStatus(400);
  const oldUser = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (oldUser) {
    return res.sendStatus(400);
  }

  let hashPw;
  try {
    hashPw = await bcrypt.hash(req.body.password, 10);
  } catch (e) {
    return res.sendStatus(400);
  }
  delete req.body.id;
  const newUser = await User.create({
    ...req.body,
    password: hashPw
  });

  return res.json({ user: newUser /*token: generateToken(newUser.id)*/ });
});

app.post("/auth/login", async (req, res) => {
  const oldUser = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (oldUser.role !== "POLICE") return res.sendStatus(403);

  if (!(await bcrypt.compare(req.body.password, oldUser.password))) {
    return res.sendStatus(403);
  }

  return res.json({
    user: oldUser,
    token: generateToken(oldUser.id)
  });
});

app.use(authMiddleware);

app.post("/cars", async (req, res) => {
  //if (!req.body.plate) return res.sendStatus(400);
  try {
    const car = await Car.create({
      ...req.body
    });

    return res.json(car);
  } catch (e) {
    return res.sendStatus(400);
  }
});
app.post("/cars/:carPlate/fines", async (req, res) => {
  try {
    const fine = await Fine.create({
      ...req.body,
      carPlate: req.params.carPlate
    });
    return res.json(fine);
  } catch (e) {
    return res.sendStatus(400);
  }
});

app.get("/fines", async (req, res) => {
  const fines = await Fine.findAll();
  return res.json(fines);
});
app.get("/cars", async (req, res) => {
  const cars = await Car.findAll();
  return res.json(cars);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

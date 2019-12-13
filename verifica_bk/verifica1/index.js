require("dotenv").config();
//Librerie
//console.log(process.env)
//throw new Error()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const authMiddleware = require("./authMiddleware");
const jwt = require("jsonwebtoken");
const port = 3000;
const app = express();

//Modelli
const User = require("./models/User");
const Fine = require("./models/Fine");
const Car = require("./models/Car")

//HMAC
const HMAC_JWT_SECRET = process.env.HMAC_JWT_SECRET

app.use(bodyParser.json());

//Signup
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
    ...req.body,
    role: "",
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
  });

  if (!user) {
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
    user: user,
    token: token
  });
});

//Middleware manager auth
app.use(authMiddleware);


//Creare auto
app.post("/cars", async (req, res) => {
  const newCar = await Car.create({
    plate: req.body.plate,
    model: req.body.model
  });
  return res.json(newCar);
});
//id	price	fk_cars	reason	createdAt	updatedAt
//Create multa associandola ad un macchina
app.post("/cars/:carId/fines", async (req, res) => {
  const newFine = await Fine.create({
    price: req.body.price,
    reason: req.body.reason,
    fk_cars: req.params.carId
  });
  return res.json(newFine);
});

//Trova tutte le multe e le auto inserite
app.get("/cars", async (req, res) => {
  const cars = await Car.findAll();
  return res.json(cars);
})

app.get("/fine", async (req, res) => {
  const fines = await Fine.findAll();
  return res.json(fines);
})


app.listen(port, () => {
  console.log("Listening on port", port);
});

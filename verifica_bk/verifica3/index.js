require("dotenv").config();
//Librerie
//console.log(process.env)
//throw new Error()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const authMiddleware = require("./authMiddleware");
const authMiddlewareUser = require("./authMiddlewareUser");
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
    role: null,
    password: hashPw
  },{omitNull: false,});
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

//Middleware User per visionare le proprie multe
app.use(authMiddlewareUser);

app.get("/fineUser", async (req, res) => {
  const fines = await Fine.findAll(
  {
    include: [{
        model: Car,
        where:{id: req.user.id },
        attributes:[]
    }]
  });
  return res.json(fines);
})

//Middleware POLICE
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

//Modificare un auto
app.put('/cars/:idCar', async (req,res) => {
  const curCar = await Car.findOne({
    where: {
      id: req.params.idCar
    }
  })
  if(curCar){
    let newCar = await curCar.update({
        id: req.params.idCar,
        ...req.body,
    });
    return res.json(newCar);
  }else{
    //non trovato
    res.sendStatus(404);
  }
})

//Modificare una multa

app.put('/fine/:idFine', async (req,res) => {
  const curFine = await Fine.findOne({
    where: {
      id: req.params.idFine
    }
  })
  if(curFine){
    let newFine = await curFine.update({
        id: req.params.idFine,
        ...req.body,
    });
    return res.json(newFine);
  }else{
    //non trovato
    res.sendStatus(404);
  }
})

//cancellare un auto
app.delete("/cars/:idCar", async (req, res) => {
  const curCar = await Car.findOne({
    where: {
      id: req.params.idCar,
    }
  })
  if(curCar){
    await curCar.destroy();
  }
  return res.sendStatus(200);
});

//cancellare una multa
app.delete("/fine/:idFine", async (req, res) => {
  const curFine = await Fine.findOne({
    where: {
      id: req.params.idFine,
    }
  })
  if(curFine){
    await curFine.destroy();
  }
  return res.sendStatus(200);
});

//Associare una o piu macchine a un cittadino
//find all dove id è quello che lo prendo dal token

// Da fixxare

app.put("/users/:usersId/cars", async (req, res) => {
  console.log("------")
  const curPut = await Car.findOne({
    where: {
      fk_users: req.params.usersId,
      plate: req.body.plate
    }
  })

  if(curPut){
    res.sendStatus(200)
  }else{
    console.log("-----");
    const assCars = await Car.upsert({
      plate: req.body.plate,
      model: req.body.model,
      fk_users: req.params.usersId
    });
    console.log(req.body.plate)
    console.log("-------")
  }

  return res.json(curPut);
});


app.listen(port, () => {
  console.log("Listening on port", port);
});

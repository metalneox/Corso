require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const bodyParser = require("body-parser");
const Car = require("./models/Car");
const Fine = require("./models/Fine");
const User = require("./models/User");
const authMiddlewarePolice = require("./authMiddlewarePolice");
const authMiddlewareAllUsers = require("./authMiddlewareAllUsers");
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
  if (!(await bcrypt.compare(req.body.password, oldUser.password))) {
    return res.sendStatus(403);
  }

  return res.json({
    user: oldUser,
    token: generateToken(oldUser.id)
  });
});

app.use(authMiddlewareAllUsers);

app.get("/userFinesUnefficient", async (req, res) => {
  const cars = await Car.findAll({
    where: {
      userId: req.user.id
    }
  });

  let fines = [];
  for (const car of cars) {
    const carFines = await Fine.findAll({
      where: {
        carPlate: car.plate
      }
    });
    fines = [...fines, ...carFines];
  }

  return res.json(fines);
});
app.get("/usersFinesAbitMoreEfficient", async (req, res) => {
  const cars = await Car.findAll({
    where: {
      userId: req.user.id
    }
  });
  const carPlates = cars.map(car => {
    return car.plate;
  });

  const fines = await Fine.findAll({
    where: {
      carPlate: {
        [Sequelize.Op.in]: carPlates
      }
    }
  });

  return res.json(fines);
});
app.get("/usersFinesEfficient", async (req, res) => {
  const fines = await Fine.findAll({
    include: [
      {
        model: Car,
        where: {
          userId: req.user.id
        },
        attributes: []
      }
    ]
  });

  return res.json(fines);
});

app.use(authMiddlewarePolice);

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
app.put("/fines/:fineId", async (req, res) => {
  const oldFine = await Fine.findOne({
    where: {
      id: req.params.fineId
    }
  });
  if (req.body.carPlate) {
    const car = await Car.findOne({
      where: {
        plate: req.body.carPlate
      }
    });
    if (!car) return res.sendStatus(400);
  }
  let fine;
  delete req.body.id;
  if (oldFine) {
    //update

    fine = await oldFine.update({
      ...req.body
    });
  } else {
    //create
    fine = await Fine.create({
      ...req.body
    });
  }

  return res.json(fine);
});
app.put("/cars/:carPlate", async (req, res) => {
  const oldCar = await Car.findOne({
    where: {
      plate: req.params.carPlate
    }
  });
  let car;
  delete req.body.plate;
  if (oldCar) {
    //update

    car = await oldCar.update({
      ...req.body
    });
  } else {
    //create
    car = await Car.create({
      ...req.body
    });
  }

  return res.json(car);
});
app.delete("/fines/:fineId", async (req, res) => {
  const oldFine = await Fine.findOne({
    where: {
      id: req.params.fineId
    }
  });
  if (oldFine) await oldFine.destroy();

  return res.sendStatus(200);
});
app.delete("/cars/:carPlate", async (req, res) => {
  const oldCar = await Car.findOne({
    where: {
      plate: req.params.carPlate
    }
  });
  if (oldCar) await oldCar.destroy();

  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

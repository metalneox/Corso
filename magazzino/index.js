require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const validator = require("email-validator");
var jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");

const Ordine = require("./models/Ordine");
const Item = require("./models/Item")
const UsersOrd = require("./models/UserOrd")
const User = require("./models/Users");

const port = 3000;
const app = express();

const HMAC_JWT_SECRET = process.env.HMAC_JWT_SECRET;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.post("/users", async (req, res) => {
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
    name: req.body.name,
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

// Lista piatti in db
/*
app.get("/ordine", async (req, res) => {
  const ordine = await Ordine.findAll();
  return res.json(ordine);
})
*/
//Solo se loggati da settare in debug non messo
// /order/:orderId/items

//API PER INSERIRE ITEMS E FARE GET ITEMS DI UN ORDINE
//API PER PRENDERE ORDINE e INSERIRE ORDINE
//SOLO
/*
app.get("/ordine", async (req, res) => {
  const ordine = await Ordine.findAll();
  return res.json(ordine);
})
*/
/* Ordinazioni + tutti i items */

/*
app.get("/ordine", async (req, res) => {
  const ordine = await Ordine.findAll({
    include: [
      {
        model: Item,
        through: {
          fk_item: "65dbcc8e-795b-475b-b12a-1767b1f17da1"
        }
      }
    ]
  });
  return res.json(ordine);
});
*/

//http://localhost:3000/ordine/6a4a5fd1-1f01-48b4-ae76-66ff14a08260
app.get("/ordine/:IDOrdine", async (request, response) => {
  const ordine = await Ordine.findOne({
    where: {
      id: request.params.IDOrdine
    }
  });
  return response.json(ordine);
});

Ordine.belongsTo(Item, {targetKey:'id',foreignKey: 'fk_item'});

app.get("/ordine/:IDOrdine/items", async (request, response) => {
  const ordine = await Ordine.findOne({
    where: {
      id: request.params.IDOrdine
    },
    include: [
      {
        model: Item
      }
    ]
  });
  return response.json(ordine);
});


//65dbcc8e-795b-475b-b12a-1767b1f17da1
/*
app.post("/create/item", async (req, res) => {
  const item = await Item.create({
    name: req.body.name
  });
  return res.json(item);
});
*/
//id	billingAddress	fk_usersord	fk_item	createdAt	updatedAt
/*
app.post("/create/ordine", async (req, res) => {
  const ordine = await Ordine.create({
    billingAddress: req.body.billingAddress,
    fk_usersord: req.body.fk_usersord,
    fk_item : req.body.fk_item
  });
  return res.json(ordine);
});
*/

/*
app.post("/create/usersord", async (req, res) => {
  const userord = await UsersOrd.create({
    fk_ord: req.body.fk_ord
  });
  return res.json(userord);
});
*/

app.listen(port, () => {
    console.log("Server listening on port", port);
  })
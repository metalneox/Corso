const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
var validator = require("email-validator");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("ecipar", "root", "", {
  host: "localhost",
  dialect: "mariadb" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
const port = 3000;

const app = express();
//prende i bodi codificati con x-www-form-urlencoded e li trasforma in oggetti javascript 

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req,res,next) =>{
  console.log('Middleware 1');
  next();
});
app.use((req,res,next) =>{
  console.log('Middleware 2');
  next();
});

//pprende i body codificato con 
//application/json e li trasforma in oggetti javascript

const City = sequelize.define(
  "city",
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "cities"
  }
);

const Person = sequelize.define(
  "person",
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    cityId:{
      type: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "people"
  }
);

const User = sequelize.define(
  "user",
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "users"
  }
);


app.get("/cities", async (req, res) => {
  if (req.query.name) {
    var where = {
      name: req.query.name
    };
  } else {
    var where = {};
  }
  const cities = await City.findAll({
    where: where
  });
  return res.json(cities);
});

app.get("/cities/:cityId", async (req, res) => {
  const city = await City.findOne({
    id: req.params.cityId
  });
  return res.json(city);
});

app.post("/cities", async (req, res) => {
  const city = await City.create({
    name: req.body.name
  });
  return res.json(city);
});

//x-www-form-urlencoded
//passiamo name:String
//mi creaa la persona con name = name passato
//cityId = cityId nel path
/*
app.post("/cities/:cityId/people", async (req, res) => {
  const person = await Person.create({
    name: req.body.name,
    cityId: req.params.cityId
  })
  console.log(req.body.name);
  return res.json(person);
});
*/

app.post("/cities/:cityId/people", async (req, res) => {
  const createdPeople = []
  for(const person of req.body){
    const newPerson = await Person.create({
        name: person.name,
        cityId: req.params.cityId
    })
    createdPeople.push(newPerson)
  }
  return res.json(createdPeople);
});


app.post("/users", async (req, res) => {
  if(!validator.validate(req.body.email)){
    return res.status(400).json({
      error: "invalid_email"
    });
  }

  try{
    var hash = await bcrypt.hash(req.body.password ,10);
  }
  catch(e){
    return res.status(400);
  } 
  try{
    const user = await User.create({
      name: req.body.name,
      password: hash,
      email: req.body.email
    })
    return res.json(user);
  }
  catch(e){
    return res.status(400);
  }
});


app.listen(port, () => {
  console.log("Server listening on port", port);
});

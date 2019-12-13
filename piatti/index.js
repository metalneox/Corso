const express = require("express");
const bodyParser = require("body-parser");
const Dish = require("./models/Dish");
const Allergen = require("./models/Allergen");
require("./models/AllergenDish");
const PORT = 3000;
function sequelize2plainObject(sequelizeObject) {
  return JSON.parse(JSON.stringify(sequelizeObject));
}
const app = express();
app.use(bodyParser.json());

app.get("/allergens", async (req, res) => {
  const allergens = await Allergen.findAll();
  return res.json(allergens);
});

app.post("/auth/login", (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!user) return res.sendStatus(404)
  const authenticated = await bcrypt.compare(
    req.body.password, user.password)

  if (authenticated) {

//Dobbiamo generare il token
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
    
  } else {
    return res.sendStatus(404)
  }
})
app.post("/allergens", async (req, res) => {
  const newAllergen = await Allergen.create({
    name: req.body.name
  });
  return res.json(newAllergen);
});
app.get("/dishes", async (req, res) => {
  const dishes = await Dish.findAll({
    include: [
      {
        model: Allergen,

        through: {
          attributes: []
        }
      }
    ]
  });

  return res.json(dishes);
});

app.post("/dishes", async (req, res) => {
  let newDish = await Dish.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });
  await newDish.setAllergens(req.body.allergens);
  const dishWithAllergens = await Dish.findOne({
    where: {
      id: newDish.id
    },
    include: [
      {
        model: Allergen,
        through: {
          attributes: []
        }
      }
    ]
  });

  return res.json(dishWithAllergens);
});

app.delete('/dishes/:dishId', (req, res) => {
  const dish2delete = await Dish.findOne({
    where: {
      id: req.params.dishId
    }
  })

  if (dish2delete) await dish2delete.destroy()

  return res.sendStatus(200)
})

app.put('/dishes/:dishId', (req,res) => {
  await Dish.upsert({
    id: req.params.dishId,
    ...req.body
  })

  const dish = await Dish.findOne({
    where: {
      id: req.params.dishId
    }
  })

  return res.json(dish)
  // const oldDish = await Dish.findOne({
  //   where: {
  //     id: req.params.dishId
  //   }
  // })
  // let newDish
  // if (oldDish) {
  //   //Aggiornamento
  //   newDish = await oldDish.update({
  //       ...req.body
  //     // name: req.body.name !== undefined 
  //     //   ? req.body.name : oldDish.name,
  //     // description: req.body.description !== undefined 
  //     // ? req.body.description : oldDish.description,
  //   })
  // } else {
  //   //Inserimento
  //   newDish = await Dish.create({
  //     ...req.body
  //     // name: req.body.name,
  //     // description: req.body.description,
  //     // price: req.body.price
  //   })
  // }

  
} )


app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});

const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

// Item Model
const Item = require('../../models/Item');

// @route  POST api/items
// @desc   Get All Items
// @access Public
router.post('/', (req, res) => {

    let carbs = req.carbs;
    let protein = req.protein;
    let calories = req.calories;
    let sodium = req.sodium;
    let fat = req.fat;
    let test = req.test;

    console.log("test " + test);

    //https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${carbs-10}&maxCarbs=${carbs+10}&minProtein=${protein-10}&maxProtein=${protein+10}&minFat=${fat-10}&maxFat=${fat+10}&minCalories=${calories-10}&maxCalories=${calories+10}&minSodium=${sodium-10}&maxSodium=${sodium+10}number=50&apiKey=e873cb404dd546f4bf8f22d23f8ac51a`

    fetch(`https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${carbs-10}&number=10&apiKey=e64c0a89a2994abdb4b68b0964c3e7b4`)
    .then(res => res.json())
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

// Item Model
const Item = require('../../models/Item');

let q = 'chicken';
let calories = '500-1000';
let from = '0';
let to = '100';
let health = 'alcohol-free';

// @route  GET api/items
// @desc   Get All Items
// @access Public
router.get('/', (req, res) => {
    /*Item.find()
        .sort({ date: -1})
        .then(items => res.json(items))*/

    // 'https://api.edamam.com/search?q=chicken&app_id=15d5461b&app_key=9b07e3daa8efced35252066252893cb3&from=0&to=50&calories=591-722&health=alcohol-free'

    fetch('https://api.spoonacular.com/recipes/findByNutrients?minCarbs=10&maxCarbs=50&number=50&apiKey=e873cb404dd546f4bf8f22d23f8ac51a')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        //console.log("yay");
        res.send(data);
    })
    .catch(err => console.log(data))
});

// @route  POST api/items
// @desc   Create An Item
// @access Public
/*router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        college: req.body.college,
        date: req.body.date,
        email: req.body.email
    });

    newItem.save().then(item => res.json(item));
});*/

// @route  DELETE api/items/:id
// @desc   Delete An Item
// @access Public
/*router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});*/

module.exports = router;
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

// Item Model
const Item = require('../../models/Item');

let q = 'chicken';
let calories = '500-1000';
let from = '0';
let to = '3';
let health = 'alcohol-free';

// @route  GET api/items
// @desc   Get All Items
// @access Public
router.get('/', (req, res) => {
    /*Item.find()
        .sort({ date: -1})
        .then(items => res.json(items))*/

    fetch('https://api.edamam.com/search?q=chicken&app_id=15d5461b&app_key=9b07e3daa8efced35252066252893cb3&from=0&to=3&calories=591-722&health=alcohol-free')
    .then(res => res.text())
    .then(data => {
        console.log(data);
        console.log("yay");
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
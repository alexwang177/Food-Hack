const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

// Item Model
const Item = require('../../models/Item');

//Twit Init
var Twit = require('twit'); 
var Sentiment = require('sentiment');

const API_KEY = 'xFUQcmUlDuf7S3dWflFs4ZXvc';
const API_SECRET = '7lb6EMeGOkHPr4bKEFThb38903BbZmfrnJPtgjWKj0zm4E2f3u';
const ACCESS_TOKEN = '2557605158-UhRurcnRflE7mWH0NsSchhbDZM50PWIulvLdw7b';
const ACCESS_SECRET = 'VZr0tZuG2zlbGsXnGI8LvXj89eF6HOsicsSQ2JFxwimJg';

//Twitter Setup
var T = new Twit({
  consumer_key:         API_KEY,
  consumer_secret:      API_SECRET,
  access_token:         ACCESS_TOKEN,
  access_token_secret:  ACCESS_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

var sentiment = new Sentiment();
var payLoad = [];

// @route  POST api/items
// @desc   Get All Items
// @access Public
router.post('/', (req, res) => {

    let maxCarbs = 100000;
    let maxProtein = 100000;
    let maxCalories = 100000;
    let maxSodium = 100000;
    let maxFat = 100000;
    let carbs = parseInt(req.body.carbs);
    let protein = parseInt(req.body.protein);
    let calories = parseInt(req.body.calories);
    let sodium = parseInt(req.body.sodium);
    let fat = parseInt(req.body.fat);
    let test = parseInt(req.body.test);

    if(!isNaN(carbs))
        maxCarbs = carbs + 10;
    else
        carbs = 0;

    if(!isNaN(protein))
        maxProtein = protein + 10;
    else
        protein = 0;
    
    if(!isNaN(calories))
        maxCalories = calories + 10;
    else
        calories = 0;

    if(!isNaN(sodium))
        maxSodium = sodium + 10;
    else
        sodium = 0;

    if(!isNaN(fat))
        maxFat = fat + 10;
    else
        fat = 0

    console.log(req.body);
    console.log(carbs)
    console.log(maxCarbs)

    //https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${carbs-10}&maxCarbs=${carbs+10}&minProtein=${protein-10}&maxProtein=${protein+10}&minFat=${fat-10}&maxFat=${fat+10}&minCalories=${calories-10}&maxCalories=${calories+10}&minSodium=${sodium-10}&maxSodium=${sodium+10}number=50&apiKey=e873cb404dd546f4bf8f22d23f8ac51a`

    fetch(`https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${carbs-10}&maxCarbs=${maxCarbs}&minProtein=${protein-10}&maxProtein=${maxProtein}&minFat=${fat-10}&maxFat=${maxFat}&minSodium=${sodium-10}&maxSodium=${maxSodium}&minCalories=${calories-10}&maxCalories=${maxCalories}&number=10&apiKey=e64c0a89a2994abdb4b68b0964c3e7b4`)
    .then(res => res.json())
    .then(data => {
        payLoad = [];
        data.map((recipeEntry) => {
            let arr = recipeEntry.title.split(' ');

            let query = '';

            for(i = 0; i < arr.length-1; i++){
                query += arr[i] + ' OR ';
            }

            query += arr[arr.length-1];
            console.log(query);

            T.get('search/tweets', { q: query, count: 100}, function(err, data, response) {
                //console.log(data);
                recipeEntry["tweets"] = data.statuses.map((tweet) => {
                    return {'text': tweet.text,
                            'sentiment': sentiment.analyze(tweet.text),
                            'id': tweet.id
                            }
                })
                
                payLoad.push(recipeEntry);
            })
        })
    })
    .catch(err => {
        console.log(err);
    })

    res.send(payLoad);
});

module.exports = router;
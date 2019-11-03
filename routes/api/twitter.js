const express = require('express');
const router = express.Router();
var Twit = require('twit'); 
var Sentiment = require('sentiment');

const API_KEY = 'xFUQcmUlDuf7S3dWflFs4ZXvc';
const API_SECRET = '7lb6EMeGOkHPr4bKEFThb38903BbZmfrnJPtgjWKj0zm4E2f3u';
const ACCESS_TOKEN = '2557605158-UhRurcnRflE7mWH0NsSchhbDZM50PWIulvLdw7b';
const ACCESS_SECRET = 'VZr0tZuG2zlbGsXnGI8LvXj89eF6HOsicsSQ2JFxwimJg';

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
// @desc   Get All Items with the queried keyword
// @access Public
router.post('/', (req, res) => {
    T.get('search/tweets', { q: 'food', count: 100}, function(err, data, response) {
        //console.log(data);
        payLoad = data.statuses.map((tweet) => {
          return {'text': tweet.text,
                  'sentiment': sentiment.analyze(tweet.text),
                  'id': tweet.id
                 }
        })
        res.send({'payLoad': payLoad});
    })
});

module.exports = router;
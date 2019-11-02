const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    nutrients: {
        type: Array,
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);
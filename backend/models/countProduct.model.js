// import mongoose
const mongoose = require('mongoose');

// get schema from mongoose
const Schema = mongoose.Schema;

// define model types
const countProductSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    priceMode: { type: String, required: true },
    volumeSize: { type: String, required: true },
    img: { type: String, required: true },
})

// export model
const CountProduct = mongoose.model('countproduct', countProductSchema);

module.exports = CountProduct;
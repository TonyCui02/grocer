const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    user: {type: String, required: true},
    name: {type: String, required: true},
    count_id: {type: String, required: true},
    pak_id: {type: String, required: true}
}, {
    timestamps: true,
});

const Item = mongoose.model('item', itemSchema);
module.exports = Item;
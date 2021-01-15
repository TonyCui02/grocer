const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item_id: { type: Number },
    item_name: { type: String },
    productCountId: { type: String, },
    productPakId: { type: String },
})

const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    items: [itemSchema],
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
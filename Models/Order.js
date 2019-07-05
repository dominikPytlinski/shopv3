const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    value: Number,
    productId: String,
    userId: String
});

module.exports = mongoose.model('Order', orderSchema);
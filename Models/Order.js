const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    value: Number,
    productsId: [{
        productId: String
    }],
    userId: String
});

module.exports = mongoose.model('Order', orderSchema);
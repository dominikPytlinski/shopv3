const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: String,
    products: [[Schema.Types.Mixed]]
});

module.exports = mongoose.model('Order', orderSchema);
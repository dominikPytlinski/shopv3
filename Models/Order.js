const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    value: Number,
    productsId: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    userId: String
});

module.exports = mongoose.model('Order', orderSchema);
const User = require('../Models/User');
const Role = require('../Models/Role');
const Category = require('../Models/Category');
const Product = require('../Models/Product');
const Order = require('../Models/Order');

const findUser = async (userId = null) => {
    if(!userId) {
        const users = await User.find({});
        return users.map(user => {
            return {
                ...user._doc,
                id: user._doc._id,
                role: findRole(user.roleId)
            }
        });
    }
    const user = await User.findById(userId);
    return {
        ...user._doc,
        id: user._doc._id,
        role: findRole(user.roleId)
    }
}

const findRole = async (roleId = null) => {
    if(!roleId) {
        const roles = await Role.find({});
        return roles.map(role => {
            return {
                ...role._doc,
                id: role._doc._id
            }
        });
    }
    return await Role.findById(roleId);
}

const findCategory = async (categoryId = null) => {
    if(!categoryId) {
        const categories = await Category.find({});
        return categories.map(category => {
            return {
                ...category._doc,
                id: category._doc._id
            }
        });
    }
    return await Category.findById(categoryId);
}

const findProduct = async (productId = null) => {
    if(!productId) {
        const products = await Product.find({});
        return products.map(product => {
            return {
                ...product._doc,
                id: product._doc._id,
                category: findCategory(product._doc.categoryId)
            }
        });
    }
    const product = await Product.findById(productId);
    return {
        ...product._doc,
        id: product._doc._id,
        category: findCategory(product._doc.categoryId)
    }
}

const findOrder = async (orderId = null) => {
    if(!orderId) {
        const orders = await Order.find({});
        return orders.map(order => {
            return {
                ...order._doc,
                id: order._doc._id,
                user: findUser(order._doc.userId),
                products: orderItem(order._doc.products)
            }
        });
    }
    const order = await Order.findById(orderId);
    return {
        ...order._doc,
        id: order._doc._id,
        user: findUser(order._doc.userId),
        products: orderItem(order._doc.products)
    }
}

const orderItem = async (products) => {
    return products.map(product => {
        return {
            quantity: product[0],
            product: findProduct(product[1])
        }
    });
}

module.exports = { findUser, findRole, findCategory, findProduct, findOrder, orderItem }
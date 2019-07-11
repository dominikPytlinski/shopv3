const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/User');
const Role = require('../Models/Role');
const Category = require('../Models/Category');
const Product = require('../Models/Product');
const Order = require('../Models/Order');

const { findUser, findRole, findCategory, findProduct, findOrder, orderItem } = require('./Helpers');

module.exports = {
    users: async () => {
        return findUser();
    },
    user: async (args) => {
        return findUser(args.id);
    },
    category: async (args) => {
        return findCategory(args.id);
    },
    categories: async () => {
        return findCategory();
    },
    product: async (args) => {
        return findProduct(args.id);
    },
    products: async () => {
        return findProduct();
    },
    order: async (args) => {
        return findOrder(args.id);
    },
    orders: async () => {
        return findOrder();
    },
    login: async (args) => {
        const user = await User.findOne({ email: args.email });
        if(!user) {
            throw new Error('Invalid credentials');
        }

        const validPassword = await bcrypt.compare(args.password, user._doc.password);
        if(!validPassword) {
            throw new Error('invalid credentials');   
        }

        const token = jwt.sign({
            userId: user._doc._id,
            roleId: user._doc.roleId
        }, process.env.PRIVATE_KEY, {
            expiresIn: '1200s'
        });

        return {
            userId: user._doc._id,
            token: token,
            expiry: Date.now() + 1200,
            role: findRole(user._doc.roleId)
        }
    },
    addUser: async (args) => {
        const passwordHash = await bcrypt.hash(args.password, 12);
        let user = new User({
            email: args.email,
            password: passwordHash,
            roleId: args.roleId
        });
        const newUser = await user.save();
        return {
            ...newUser._doc,
            id: newUser._doc._id,
            role: findRole(newUser._doc.roleId)
        }
    },
    addRole: async (args) => {
        let role = new Role({
            role: args.role
        });
        return await role.save();
    },
    addCategory: async (args) => {
        let category = new Category({
            name: args.name
        });
        return await category.save();
    },
    addProduct: async (args) => {
        let product = new Product({
            name: args.name,
            desc: args.desc,
            img: args.img,
            price: args.price,
            categoryId: args.categoryId
        });
        const newProduct = await product.save();
        return {
            ...newProduct._doc,
            id: newProduct._doc._id,
            category: findCategory(newProduct._doc.categoryId)
        }
    },
    addOrder: async (args) => {
        const products = args.products.map(product => {
            return [product.quantity, product.productId]
        });

        let order = new Order({
            userId: args.userId,
            products: products
        });
        const result = await order.save();
        const user = await User.findById(args.userId);

        user.orders.push(result._doc._id);
        await user.save();

        return {
            ...result._doc,
            id: result._doc._id,
            user: findUser(result._doc.userId),
            products: orderItem(result._doc.products)
        };
    },
    updateUser: async (args) => {
        const passwordHash = await bcrypt.hash(args.password, 12);
        let user = {
            email: args.email,
            password: passwordHash,
            roleId: args.roleId
        };
        await User.findByIdAndUpdate(args.id, user);
        const upddatedUser = await User.findById(args.id);
        return {
            ...upddatedUser._doc,
            id: upddatedUser._doc._id,
            role: findRole(upddatedUser._doc.roleId)
        }
    },
    updateProduct: async (args) => {
        let product = {
            name: args.name,
            desc: args.desc,
            img: args.img,
            price: args.price,
            categoryId: args.categoryId
        };
        await Product.findByIdAndUpdate(args.id, product);
        const updatedProduct = await Product.findById(args.id);
        return {
            ...updatedProduct._doc,
            id: updatedProduct._doc._id,
            category: findCategory(updatedProduct._doc.categoryId)
        }
    }
}
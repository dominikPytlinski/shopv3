const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/User');
const Role = require('../Models/Role');
const Category = require('../Models/Category');
const Product = require('../Models/Product');

const findRole = async (roleId) => {
    return await Role.findById(roleId);
}

const findCategory = async (categoryId = null) => {
    if(!categoryId) {
        return await Category.find({});
    }
    return await Category.findById(categoryId);
}

module.exports = {
    users: async () => {
        const users = await User.find({});
        return users.map(user => {
            return {
                ...user._doc,
                password: null,
                id: user._id,
                role: findRole(user._doc.roleId)
            }
        })
    },
    user: async (args) => {
        const user = await User.findById(args.id);
        return {
            ...user._doc,
            password: null,
            id: user._id,
            role: findRole(user._doc.roleId)
        }
    },
    category: async (args) => {
        return findCategory(args.id);
    },
    categories: async () => {
        return findCategory();
    },
    product: async (args) => {
        const product = await Product.findById(args.id);
        return {
            ...product._doc,
            id: product._doc._id,
            category: findCategory(product._doc.categoryId)
        }
    },
    products: async () => {
        const products = await Product.find({});
        return products.map(product => {
            return {
                ...product._doc,
                id: product._doc._id,
                category: findCategory(product._doc.categoryId)
            }
        });
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
        return await user.save();
    },
    addRole: async (args) => {
        let role = new Role({
            role: args.role
        });
        return await role.save();
    }
}
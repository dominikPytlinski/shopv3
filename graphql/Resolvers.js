const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/User');
const Role = require('../Models/Role');
const Category = require('../Models/Category');
const Product = require('../Models/Product');
const Order = require('../Models/Order');

const findUser = async (userId) => {
    return await User.findById(userId);
}

const findRole = async (roleId) => {
    return await Role.findById(roleId);
}

const findCategory = async (categoryId = null) => {
    if(!categoryId) {
        return await Category.find({});
    }
    return await Category.findById(categoryId);
}

const findProduct = async (productId = null) => {
    if(!productId) {
        return await Product.find({});
    }
    const product = await Product.findById(productId);
    return {
        ...product._doc,
        id: product._doc._id,
        category: findCategory(product._doc.categoryId)
    }
}

const orderItem = async (products) => {
    return products.map(product => {
        return {
            quantity: product[0],
            product: singleProduct(product[1])
        }
    });
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
        findProduct(args.id);
    },
    products: async () => {
        findProduct();
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
        return {
            ...result._doc,
            id: result._doc._id,
            user: findUser(result._doc.userId),
            products: orderItem(result._doc.products)
        };
    }
}
const User = require('../Models/User');
const Role = require('../Models/Role');
const Category = require('../Models/Category');

module.exports = {
    users: async () => {
        const users = await User.find({});
        return users.map(user => {
            return {
                ...user._doc,
                password: null,
                id: user._id,
                role: Role.findById(user.roleId)
            }
        })
    },
    user: async (args) => {
        const user = await User.findById(args.id);
        return {
            ...user._doc,
            password: null,
            id: user._id,
            role: await Role.findById(user.roleId)
        }
    },
    category: async (args) => {
        return await Category.findById(args.id)
    },
    categories: async () => {
        return await Category.find({});
    }
}
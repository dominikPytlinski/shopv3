const User = require('../Models/User');
const Role = require('../Models/Role');

module.exports = {
    users: async () => {
        const users = await User.find({});
        return users.map(user => {
            return {
                ...user._doc,
                password: null,
                id: user._id,
                role: await Role.findById(user.roleId)
            }
        })
    },
    user: async (args) => {
        const user = await User.findById(args.id);
        return {
            ...user._doc,
            password: null,
            id: user._id
        }
    }
}
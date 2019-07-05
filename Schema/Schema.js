const graphql = require('graphql');

const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLList } = graphql;

const User = require('../Models/User');
const Role = require('../Models/Role');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: {
            type: RoleType,
            resolve: async (parent, args) => {
                return await Role.findById(parent.roleId);
            }
        }
    })
});

const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: () => ({
        id: { type: GraphQLID },
        role: { type: GraphQLString }
    })
});

const RootQuey = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                return await User.findById(args.id);
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve: async (parent, args) => {
                return await User.find({});
            }
        },
        role: {
            type: RoleType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                return await Role.findById(args.id);
            }
        },
        roles: {
            type: GraphQLList(RoleType),
            resolve: async (parent, args) => {
                return await Role.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                roleId: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                let user = new User({
                    email: args.email,
                    passwrod: args.password,
                    roleId: args.roleId
                });
                return await user.save();
            }
        },
        addRole: {
            type: RoleType,
            args: {
                role: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                let role = new Role({
                    role: args.role
                });
                return await role.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuey,
    mutation: Mutation
});
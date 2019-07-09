const graphql = require('graphql');

const { GraphQLObjectType, GraphQLSchema, GraphQLFloat, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } = graphql;

const User = require('../Models/User');
const Role = require('../Models/Role');
const Category = require('../Models/Category');
const Product = require('../Models/Product');
const Order = require('../Models/Order');

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

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        desc: { type: GraphQLString },
        img: { type: GraphQLString },
        price: { type: GraphQLInt },
        category: {
            type: CategoryType,
            resolve: async (parent, args) => {
                return await Category.findById(parent.categoryId);
            }
        }
    })
});

const OrderType = new GraphQLInputObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLInt },
        product: {
            type: ProductType,
            resolve: async (parent) => {

            }
        }
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
                console.log(await Role.find({}));
                return await Role.find({});
            }
        },
        category: {
            type: CategoryType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                return await Category.findById(args.id);
            }
        },
        categories: {
            type: GraphQLList(CategoryType),
            resolve: async (parent, args) => {
                return await Category.find({});
            }
        },
        product: {
            type: ProductType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                return await Product.findById(args.id);
            }
        },
        products: {
            type: GraphQLList(ProductType),
            resolve: async (parent, args) => {
                return await Product.find({});
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
        },
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                let category = new Category({
                    name: args.name
                });
                return await category.save();
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                desc: { type: GraphQLString },
                img: { type: GraphQLString },
                price: { type: GraphQLInt },
                categoryId: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                let product = new Product({
                    name: args.name,
                    desc: args.desc,
                    img: args.img,
                    price: args.price,
                    categoryId: args.categoryId
                });
                return await product.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuey,
    mutation: Mutation
});
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        id: ID!
        email: String!
        password: String
        role: Role!
    }

    type Role {
        id: ID!
        role: String!
    }

    type Category {
        id: ID!
        name: String!
    }

    type Product {
        id: ID!
        name: String!
        desc: String!
        img: String
        price: Float!
        category: Category!
    }

    type Order {
        id: ID!
        user: User!
        products: [OrderItem!]!
    }

    type OrderItem {
        quantity: Int!
        product: Product!
    }

    input OrderInput {
        quantity: Int!
        productId: ID!
    }

    type Auth {
        userId: String!
        token: String!
        expiry: String!
        role: Role!
    }

    type RootQuery {
        users: [User]
        user(id: ID!): User
        category(id: ID!): Category
        categories: [Category]
        product(id: ID!): Product!
        products: [Product]!
        order(id: ID!): Order!
        orders: [Order!]
        login(email: String!, password: String!): Auth!
    }

    type Mutation {
        addUser(email: String!, password: String!, roleId: String!): User!
        addRole(role: String!): Role!
        addProduct(name: String!, desc: String!, img: String!, price: Float!, categoryId: ID!): Product!
        addCategory(name: String!): Category!
        addOrder(userId: ID!, products: [OrderInput!]!): Order!
    }

    schema {
        query: RootQuery
        mutation: Mutation
    }
`);
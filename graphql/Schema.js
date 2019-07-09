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
        value: Int!
        products: [Product!]!
        user: User!
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
    }

    schema {
        query: RootQuery
    }
`);
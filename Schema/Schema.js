const graphql = require('graphql');

const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
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
            resolve() {
                // code for getting fron db
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuey
});
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./Schema/Schema');
const mongoose = require('mongoose');

const mySchema = require('./graphql/Schema');
const resolvers = require('./graphql/Resolvers');

require('dotenv').config();

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    rootValue: resolvers,
    graphiql: true
}));

const PORT = process.env.PORT || 4000;

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-kszkn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    )
    .catch(err => console.log(err));
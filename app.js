const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();



app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHTTP({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  );

mongoose.connect(

    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
      }@cluster0.u6dumdk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`


    ).then(() => {
        app.listen(4000);
        })
        .catch(err => {
        console.log(err);
    });

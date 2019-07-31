const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

const port = process.env.PORT || 3000;
const app = express();

/**graphql */
const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/node-graphql')
        .then( () => console.log('mongodb connected'))
        .catch(err => console.log(err));




app.use('/api/graphql' , graphqlHttp({

    schema : graphQlSchema ,
    rootValue :  graphQlResolvers,
    graphiql : true
}));


app.listen(port , () => console.log(`app running on port ${port}`));

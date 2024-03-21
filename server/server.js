const express = require('express');
const path = require("path");
const db = require("./config/connection");
const models = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./Schemas");
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { expressMiddleware } = require('@apollo/server/express4');

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const games = await models.Game.find({});
        res.status(200).json(games);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    // app.use('/graphql', expressMiddleware(server));

    // if we're in production, serve client/dist as static assets
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
  
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    } 
    console.log(`Successfully started Apollo server at http://localhost:${PORT}/graphql.`);
    
    db.once("open", () => {
        console.log("Connection to db successful");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
}

startApolloServer().catch((err) => {
    console.log(err);
});
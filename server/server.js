const express = require('express');
const path = require("path");
const db = require("./config/connection");
// const models = require("./models");
const { authMiddleware } = require('./utils/auth');
const PORT = process.env.PORT || 3000;

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require("./Schemas");
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // In production, I return a generic error message and overwrite all error codes with "SERVER_ERROR".This is a deliberate security choice to avoid leaking internal logic, database structure, or API behavior. In development, I expose full error details to aid debugging.
    // TODO: In the future, implement logging of full internal errors (e.g., using Sentry, LogRocket, or a file-based logger) to ensure visibility when detailed error messages are hidden from the client.
    formatError: (err) => {
        const isDev = process.env.NODE_ENV !== 'production';
        const baseError = {
            message: isDev ? err.message : "A request error occurred.",
        };

        if (isDev) {
            return {
                ...baseError,
                locations: err.locations,
                path: err.path,
                extensions: err.extensions,
            };
        }

        return {
            ...baseError,
            extensions: {
                code: "SERVER_ERROR",
            },
        };
    }
});

const app = express();

// app.get('/', async (req, res) => {
//     try {
//         const games = await models.Game.find({});
//         res.status(200).json(games);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

const startApolloServer = async () => {
    await server.start();
    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());
    // server.applyMiddleware({ app });
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));

    // If we're in production, serve client/dist as static assets
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
            console.log(process.env.NODE_ENV);
        });
    });
}

startApolloServer().catch((err) => {
    console.log(err);
});
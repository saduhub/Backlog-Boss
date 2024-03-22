const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const secret = process.env.SECRET
const expiration = '30d';

module.exports = {
    authMiddleware: function ({ req }) {
      let token = req.body.token || req.query.token || req.headers.authorization;

      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }
  
      if (!token) {
        return `Error producing token from req ${req}`;
      }
  
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
  
      return req;
    },

    signToken: function ({ email, name, _id }) {
      const payload = { email, name, _id };
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};

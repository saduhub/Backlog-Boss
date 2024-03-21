const { User, Game, Review } = require('../models');

const resolvers = {
    Query: {
      // Fetch all users
      users: async () => {
        return await User.find({});
      },
      // Fetch a single user by ID
      user: async (_, { id }) => {
        return await User.findById(id);
      },
      // Fetch all games
      games: async () => {
        return await Game.find({});
      },
      // Fetch a single game by ID
      game: async (_, { id }) => {
        return await Game.findById(id).populate({path: "reviews", populate:"user"})
      },
      // Fetch all reviews
      reviews: async () => {
        return await Review.find({});
      },
      // Fetch a single review by ID
      review: async (_, { id }) => {
        return await Review.findById(id);
      },
      // Fetch all reviews made by a user
      userReviews: async (_, { id }) => {
        return await Review.find(
          {
            user: { id: id},
          }
        ).populate("user", "game");
      },
    },
};

module.exports = resolvers;
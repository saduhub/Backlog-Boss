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
        return await Game.find({}).populate({path: "reviews", populate:"user"});
      },
      // Fetch a single game by ID
      game: async (_, { id }) => {
        try {
          const game = await Game.findById(id).populate({path: "reviews", populate:"user"})
          console.log(game)
           return game
        } catch(error) {
          console.log(error)
        }
        
      },
      // Fetch all reviews
      reviews: async () => {
        return await Review.find({});
      },
      // Fetch a single review by ID
      review: async (_, { id }) => {
        return await Review.findById(id);
      },
    },
  Mutation: {
    addReview: async (_, {id, reviewNum, reviewText}) => {
      //user property comes from session/authentication
      console.log(reviewText)
      const review = await Review.create({
        user: "65fcf698c6dd7dd3ed6afd31", //replace later
        game: id,
        rating: reviewNum,
        reviewText: reviewText
      })
      console.log(review);
      const game = await Game.findOneAndUpdate({_id: id}, {$push: {reviews: review._id}}, {new: true, populate: {path: "reviews", populate: {path: "user"}}} )
          // Handle case where game is not found
    if (!game) {
      throw new Error("Game not found");
    }

      console.log(game.reviews[0])
      return game
    }
  }
};
  
module.exports = resolvers;
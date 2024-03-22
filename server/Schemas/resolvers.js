const { User, Game, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
      // Fetch a user and all review/games documents related to the user on login. (However, specify on client side what should be returned)
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id })
            .populate([
              { path: 'reviews' }, 
              { path: 'gamesInFavorites' }, 
              { path: 'gamesInBacklog' },
              { path: 'gamesCompleted' }, 
              { path: 'gamesInProgress' }, 
              { path: 'friends' }, 
              { path: 'likedReviews' }
            ])
        }
        throw AuthenticationError;
      },
    },
    Mutation: {
      addUser: async (parent, { password, email, username }) => {
        const user = await User.create({ password, email, username });
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isPasswordCorrect(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
        console.log(token, user)
        return { token, user };
      },
    }
};

module.exports = resolvers;
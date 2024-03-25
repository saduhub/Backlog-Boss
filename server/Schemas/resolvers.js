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
      // Game Suggestions
      gameSuggestions: async() => {
        return await Game.find({}).populate("reviews");
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
            user: { _id: id},
          }
        ).populate("user", "game");
      },
      // Fetch a user and all review/games documents related to the user on login. (However, specify on client side what should be returned)
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id })
            .populate([
              { path: 'reviews' }, 
              { path: 'friendRequests' }, 
              { path: 'gamesInFavorites' }, 
              { path: 'gamesInBacklog' },
              { path: 'gamesCompleted' }, 
              { path: 'games100Completed' }, 
              { path: 'gamesInProgress' }, 
              { path: 'friends' }, 
              { path: 'likedReviews' }
            ])
        }
        throw AuthenticationError;
      },
      userVisitedInfo: async (parent, args, context) => {
        const { id } = args;

        if (context.user) {
          return User.findOne({ _id: id })
            .populate([
              { path: 'reviews' }, 
              { path: 'friendRequests' }, 
              { path: 'gamesInFavorites' }, 
              { path: 'gamesInBacklog' },
              { path: 'gamesCompleted' }, 
              { path: 'games100Completed' }, 
              { path: 'gamesInProgress' }, 
              { path: 'friends' }, 
              { path: 'likedReviews' }
            ])
        }
        throw AuthenticationError;
      },
    },

    Mutation: {
      addFriend: async (_, { id }, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(
            context.user._id,
            { $push: { friends: id } },
            { new: true }
          )
        }
      },
      removeFriend: async (_, { id }, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(
            context.user._id,
            { $pull : { friends: id } },
            { new: true }
          )
        }
      },
      requestFriend: async (_, { id }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $push: { friendRequests: {id} }},
            { new: true }
          ).populate('friendRequests');
          return updatedUser;
        }
      },
      rejectFriend: async (_, { id }, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(
            context.user._id,
            { $pull : { friendRequests : id } },
            { new: true }
          )
        }
      },
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
      addReview: async (_, {id, reviewNum, reviewText}, context) => {
        console.log(context)
        //user property comes from session/authentication
        console.log(reviewText)
        const review = await Review.create({
          user: context.user._id, //replace later
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
      },
      addToBacklog: async (_, { gameId }, context) => {
        if (!context.user) throw AuthenticationError;
    
        return await User.findByIdAndUpdate(
          context.user._id,
           // $addToSet will avoid duplicates
          { $addToSet: { gamesInBacklog: gameId } },
          { new: true }
        );
      }
    }
};

module.exports = resolvers;

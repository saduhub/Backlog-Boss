const { User, Game, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

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
          const url = `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`;

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`${response.status}`);
            }
            const data = await response.json();
            // console.log(data.results);
            return data.results;
          } catch (err) {
            console.error(err);
          }
/*           const game = await Game.findById(id).populate({path: "reviews", populate:"user"})
          console.log(game)
           return game */
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
              { path: 'reviews',
                populate: { path: 'game', select: '_id title' }
              }, 
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
      getPopularGames: async (parent, args, context) => {
        const url = `https://api.rawg.io/api/games?page_size=9&key=${process.env.RAWG_API_KEY}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`${response.status}`);
          }
          const data = await response.json();
          // console.log(data.results);
          return data.results;
        } catch (err) {
          console.error(err);
        }
      },
      getAiImage: async (parent, {prompt}, context) => {
        try {
          const image = await openai.images.generate({
            model: "dall-e-2",  // dall-e-2 (default) or dall-e-3
            prompt,
            n: 1, // dall-e-2 can generate up to n: 10, dall-e-3 can only use n: 1
            size: "256x256",  // dall-e-2 sizes: "256x256", "512x512", "1024x1024" || dall-e-3 sizes: "1024x1024", "1024x1792", 1792x1024"
            style: "natural", // vivid (default) or natural
            // quality: "standard",  // standard (default) or hd
            // response_format: "url", // url (default) or b64_json
            // user: 'insertUsername' // keeps track of user who generated the image
          });
          
          // const url = image.data[0].url;
          // console.log(image.data);
          return image.data[0];
          // setImgUrl(url);
          // console.log(image.data);
        } catch (err) {
          console.log(err);
        }
      }
    },

    Mutation: {
      addFriend: async (_, { userId }, context) => {
        if (context.user) {
          console.log(userId)
          console.log(context.user._id)
          console.log(context.user)
          return await User.findByIdAndUpdate(
            context.user._id,
            { $push: { friends: userId },
              $pull: { friendRequests: userId } 
            }
          );
        }

        if(!context.user) {
          
        }
        throw new Error(context.user, context.user._id);
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
        throw new Error("User not updated");
      },
      rejectFriend: async (_, { id }, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(
            context.user._id,
            { $pull : { friendRequests : id } },
            { new: true }
          )
        }
        throw new Error("User not updated");
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
          user: context.user._id,
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
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('You must be logged in to perform this action');
      }

      const updatedUser = await User.findByIdAndUpdate(
        {_id : user._id},
        { $addToSet: { gamesInBacklog: gameId } },
        { new: true }
      );

      return updatedUser;
    },

    addToFavorites: async (_, { gameId }, context) => {
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('You must be logged in to perform this action');
      }

      const updatedUser = await User.findByIdAndUpdate(
        {_id : user._id},
        { $addToSet: { gamesInFavorites: gameId } },
        { new: true }
      );

      return updatedUser;
    },
    
    addToInProgress: async (_, { gameId }, context) => {
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('You must be logged in to perform this action');
      }

      const updatedUser = await User.findByIdAndUpdate(
        {_id : user._id},
        { $addToSet: { gamesInProgress: gameId } },
        { new: true }
      );

      return updatedUser;
    },

    addToCompleted: async (_, { gameId }, context) => {
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('You must be logged in to perform this action');
      }

      const updatedUser = await User.findByIdAndUpdate(
        {_id : user._id},
        { $addToSet: { gamesCompleted: gameId } },
        { new: true }
      );

      return updatedUser;
    },

    changeProfilePic: async (_, { url }, context) => {
      const { user } = context;
      
      if(!user){
        // throw new AuthenticationError('You must be logged in to perform this action');
        return
      }

      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: { profilePictureUrl: url } },
        { new: true }
      );
      
      return updatedUser;
    },

    saveAiPic: async (_, { url }, context) => {
      const { user } = context;

      if(!user) {
        // throw new AuthenticationError('You must be logged in to perform this action');
        return
      }

      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $addToSet: { aiImages: url } },
        { new: true }
      );
      
      return updatedUser;
    }
}
};

module.exports = resolvers;

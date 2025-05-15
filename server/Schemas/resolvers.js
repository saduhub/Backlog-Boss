const { User, Game, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');
const { OpenAI } = require('openai');
const { v2: cloudinary } = require("cloudinary");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
        //   const url = `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`;

        //   try {
        //     const response = await fetch(url);
        //     if (!response.ok) {
        //       throw new Error(`${response.status}`);
        //     }
        //     const data = await response.json();
        //     // console.log(data.results);
        //     return data.results;
        //   } catch (err) {
        //     console.error(err);
        //   }
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
        // return await Review.find({});
        return await Review.find({})
         .populate({            // User
           path: 'user',
           select: 'username profilePictureUrl'  // only the fields needed
         })
         .populate({            // Game
           path: 'game',
           select: 'title pictureUrl averageRating'
         });
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
        if (!prompt || !prompt.trim()) {
          throw new Error("Prompt cannot be empty.");
        }

        try {
          const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",  
            response_format: "b64_json", // url (default but replaced in order to store image into cloudinary and to make images public ) or b64_json
            // user: 'insertUsername' // keeps track of user who generated the image
          });
          // Extract from OpenAI API Response
          const b64 = imageResponse.data[0].b64_json;
          // Set Up Cloudinary Parameter 
          const dataUri = `data:image/png;base64,${b64}`;
          // Upload to Cloudinary
          const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "ai-images",
            format: "png",
          });
          // console.log(uploadResult);
        
          return { url: uploadResult.secure_url }

        } catch (err) {
          console.log(err);
        }
      },
      relatedGamesByGenre: async (parent, { genres, limit}) => {
        if (!Array.isArray(genres) || genres.length === 0) {
          throw new ApolloError(
            "You must supply at least one genre",
            "BAD_USER_INPUT"
          );
        }

        const size = Math.max(1, Math.min(limit || 20, 100));

        try {
          const results = await Game.aggregate([
            { $match: { genre: { $in: genres } } },
            { $sample: { size } },
          ]);
          return results;
        } catch (err) {
          console.error("relatedGamesByGenre error:", err);
          throw new ApolloError(
            "Failed to fetch related games",
            "RELATED_GAMES_GENRE_ERROR"
          );
        }
      }
    },

    Mutation: {
      // Issues with context prompted dirrect passing of id from local storage.
      addFriend: async (_, { userId, myId }, context) => {
        // console.log(myId);
        // console.log(userId);
        return await User.findByIdAndUpdate(
          myId,
          { $push: { friends: userId },
            $pull: { friendRequests: userId } 
          },
          { new: true }
        );
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
      // Issues with context prompted direct passing of id from local storage.
      rejectFriend: async (_, { userId, myId }, context) => {
        console.log(myId);
        console.log(userId);
        return await User.findByIdAndUpdate(
          myId,
          { $pull : { friendRequests : userId } },
          { new: true }
        )
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

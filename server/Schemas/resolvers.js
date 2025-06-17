const { User, Game, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');
const { OpenAI } = require('openai');
const { v2: cloudinary } = require("cloudinary");
const { wrapResolver } = require('../utils/wrapResolver');

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
        try {
          return await User.findById(id);
        } catch (err) {
          return err;
        }
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
          // console.log(game)
          // console.log(id)
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
      reviews: wrapResolver( async () => {
        return await Review.find({})
         .populate({            // User
           path: 'user',
           select: 'username profilePictureUrl'  // only the fields needed
         })
         .populate({            // Game
           path: 'game',
           select: 'title pictureUrl averageRating'
         });        
      }, "Failed to fetch reviews", "REVIEW_FETCH_ERROR"),
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
      profileBackloggedCount: async (parent, args, context) => {
        if (!context.user) throw new AuthenticationError('Not logged in');

        const user = await User.findById(context.user._id).select('gamesInBacklog');
        return user?.gamesInBacklog?.length || 0;
      },
      userVisitedInfo: async (parent, args, context) => {
        const { id } = args;
        // console.log("userVisitedInfo called with id:", id);
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
      userVisitedBackloggedCount: async (parent, args, context) => {
        // console.log(args);
        const { id } = args;
        // console.log("userVisitedBackloggedCount called with id:", id);
        if (!context.user) throw new AuthenticationError('Not logged in');
        const user = await User.findById(id).select('gamesInBacklog');
        if (!user) {
          throw new Error("User not found");
        }
        return user?.gamesInBacklog?.length || 0;
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
      getAiImage: async (_, { prompt }) => {
        // console.log("Generating image for prompt:", prompt);
        if (!prompt || !prompt.trim()) {
          // console.warn("Prompt missing or empty.");
          return { url: null, error: "empty_prompt" };
        }

        try {
          const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
          });
           // Extract from OpenAI API Response
          const b64 = response.data[0]?.b64_json;
          
          if (!b64) {
            // console.error("OpenAI response missing b64_json:", response);
            return { url: null, error: "no_image_data" };
          }
          // Set Up Cloudinary Parameter      
          const dataUri = `data:image/png;base64,${b64}`;
          // Upload to Cloudinary
          const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "ai-images",
            format: "png",
          });
          return { url: uploadResult.secure_url, error: null };
        } catch (err) {
          // console.error("Caught OpenAI image generation or cloudinary error:", err);
          const errorType = err?.error?.type || err?.response?.data?.error?.type || "unknown_error";
          return { url: null, error: errorType };
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
      addFriend: async (_, { userId }, context) => {
        if (!context.user) {
          throw new AuthenticationError("You must be logged in");
        }
        const myId = context.user._id;
        await User.findByIdAndUpdate(
          myId,
          { $push: { friends: userId },
            $pull: { friendRequests: userId } 
          }
        );

        await User.findByIdAndUpdate(
          userId,
          {
            $push: { friends: myId }
          }
        );

        return await User.findById(myId)
          .populate('friends')
          .populate('friendRequests');
      },
      removeFriend: async (_, { id }, context) => {
        if (context.user) {
          const userId = context.user._id;

          await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: id } }
          );

          await User.findByIdAndUpdate(
            id,
            { $pull: { friends: userId } }
          );

          return await User.findById(userId).populate('friends');
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
      rejectFriend: async (_, { userId }, context) => {
        if (!context.user) {
          throw new AuthenticationError("You must be logged in");
        }
        const myId = context.user._id;
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
        // console.log(token, user)
        return { token, user };
      },
      addReview: async (_, {gameId, rating, reviewText}, context) => {
        //user property comes from session/authentication
        if (!context.user) {
          throw new AuthenticationError("You must be logged in");
        }
        // Handle case where game is not found
        if (!gameId) {
          throw new Error("Game not found");
        }
        try {
          let review = await Review.create({
            user: context.user._id,
            game: gameId,
            rating,
            reviewText,
          });
          // After creating the Review, resolver populates both the user and game fields so the mutation returns a fully‑shaped Review object (with username, game title, timestamp, and likes).
          review = await review.populate('user', '_id username profilePictureUrl');
          review = await review.populate('game', '_id title');

          await Game.findByIdAndUpdate(
            gameId,
            { $push: { reviews: review._id } },
            { new: true }
          );

          await User.findByIdAndUpdate(
            context.user._id,
            { $push: { reviews: review._id } },
            { new: true }
          );
          // By returning all necessary data in one go, the client can render the new review instantly without needing to refetch the entire game or reviews list.
          return review;
          
        } catch (err) {
          console.error("addReview error:", err);
          throw new ApolloError("Could not add review", "ADD_REVIEW_FAILED");
        }
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
      removeFromBacklog: async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError();
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { gamesInBacklog: gameId } },
          { new: true }
        );
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
      removeFromFavorites: async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError();
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { gamesInFavorites: gameId } },
          { new: true }
        );
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
      removeFromInProgress: async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError();
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { gamesInProgress: gameId } },
          { new: true }
        );
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
      removeFromCompleted: async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError();
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { gamesCompleted: gameId } },
          { new: true }
        );
      },
      addTo100Completed: async (_, { gameId }, context) => {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError('You must be logged in to perform this action');
        }

        const updatedUser = await User.findByIdAndUpdate(
          {_id : user._id},
          { $addToSet: { games100Completed: gameId } },
          { new: true }
        );

        return updatedUser;
      },
      removeFrom100Completed: async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError();
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { games100Completed: gameId } },
          { new: true }
        );
      },
      addLikeToReview: async (_, { reviewId }, { user }) => {
        if (!user) throw new AuthenticationError("You must be logged in to perform this action");
        const me = await User.findById(user._id);
        const review = await Review.findById(reviewId);
        if (!review) throw new Error("Review not found");
        // Only add if not already liked
        if (!me.likedReviews.includes(reviewId)) {
          me.likedReviews.push(reviewId);
          review.likes += 1;
          await me.save();
          await review.save();
        }
        return review;
      },
      removeLikeFromReview: async (_, { reviewId }, { user }) => {
        if (!user) throw new AuthenticationError("You must be logged in to perform this action");
        const me = await User.findById(user._id);
        const review = await Review.findById(reviewId);
        if (!review) throw new Error("Review not found");
        // only remove if currently liked
        if (me.likedReviews.includes(reviewId)) {
          me.likedReviews.pull(reviewId);
          review.likes = Math.max(0, review.likes - 1);
          await me.save();
          await review.save();
        }
        return review;
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

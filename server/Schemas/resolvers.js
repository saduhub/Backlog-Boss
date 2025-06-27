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
      users: wrapResolver( async () => {
        return await User.find({});
      },"Failed to fetch users", "FETCH_ERROR"),
      // Fetch a single user by ID
      user: wrapResolver( async (_, { id }) => {
          return await User.findById(id);
      },"Failed to fetch user", "FETCH_ERROR"),
      // Fetch all games
      games: wrapResolver( async () => {
        return await Game.find({}).populate({path: "reviews", populate:"user"});
      },"Failed to fetch games", "FETCH_ERROR"),
      // Fetch a single game by ID
      game: wrapResolver( async (_, { id }) => {
          return await Game.findById(id).populate({path: "reviews", populate:"user"});
      }, "Failed to fetch game", "FETCH_ERROR"),
      // Game Suggestions
      gameSuggestions: wrapResolver( async() => {
        return await Game.find({}).populate("reviews");
      },"Failed to fetch game suggestions", "FETCH_ERROR"),
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
      }, "Failed to fetch reviews", "FETCH_ERROR"),
      // Fetch a single review by ID
      review: wrapResolver( async (_, { id }) => {
        return await Review.findById(id);
      },"Failed to fetch review", "FETCH_ERROR"),
      // Fetch all reviews made by a user
      userReviews: wrapResolver( async (_, { id }) => {
        return await Review.find({user: { _id: id}}).populate("user", "game");
      },"Failed to fetch user reviews", "FETCH_ERROR"),
      // Fetch a user and all review/games documents related to the user on login. (However, specify on client side what should be returned)
      me: wrapResolver( async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        // Fetch a single user by ID
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
      },"Failed to fetch me", "FETCH_ERROR"),
      profileBackloggedCount: wrapResolver( async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        // Fetch a single user by ID and return the count of games in backlog rather than the entire array.
        const user = await User.findById(context.user._id).select('gamesInBacklog');
        return user?.gamesInBacklog?.length || 0;
      },"Failed to fetch profile backlogged count", "FETCH_ERROR"),
      userVisitedInfo: wrapResolver( async (parent, args, context) => {
        // deconstruct the user visited ID from args
        const { id } = args;
        // console.log("userVisitedInfo called with id:", id);
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        // Fetch a single user by ID and populate all necessary fields.
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
      },"Failed to fetch user visited info", "FETCH_ERROR"),
      userVisitedBackloggedCount: wrapResolver( async (parent, args, context) => {
        // deconstruct the user visited ID from args
        const { id } = args;
        // console.log("userVisitedBackloggedCount called with id:", id);
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        const user = await User.findById(id).select('gamesInBacklog');
        return user?.gamesInBacklog?.length || 0;
      },"Failed to fetch user visited backlogged count", "FETCH_ERROR"),
      getPopularGames: wrapResolver( async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        const url = `https://api.rawg.io/api/games?page_size=10&key=${process.env.RAWG_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.results);
        return data.results;
      },"Failed to fetch popular games", "FETCH_ERROR"),
      // Leave bypass as is for now. The frontend expects a specific { url, error } structure.
      // Note: wrapResolver only intercepts thrown errors, not returned objects.
      getAiImage: wrapResolver( async (_, { prompt }, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        if (!prompt || !prompt.trim()) {
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
      },"Failed to fetch create or save AI image", "FETCH_ERROR"),
      relatedGamesByGenre: wrapResolver( async (parent, {genres, limit}) => {
        const size = Math.max(1, Math.min(limit || 20, 25));
        const results = await Game.aggregate([
          { $match: { genre: { $in: genres } } },
          { $sample: { size } },
        ]);
        return results;
      }, "Failed to fetch related games", "FETCH_ERROR"),
    },

    Mutation: {
      addFriend: wrapResolver(async (_, { userId }, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
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
      },"Failed to add friend", "UPDATE_ERROR"),
      removeFriend: wrapResolver(async (_, { id }, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
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
      },"Failed to remove friend", "UPDATE_ERROR"),
      requestFriend: wrapResolver(async (_, { id }, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { friendRequests: {id} }},
          { new: true }
        ).populate('friendRequests');
        return updatedUser;
      },"Failed to request friend", "UPDATE_ERROR"),
      // Issues with context prompted direct passing of id from local storage.
      rejectFriend: wrapResolver(async (_, { userId }, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        const myId = context.user._id;
        return await User.findByIdAndUpdate(
          myId,
          { $pull : { friendRequests : userId } },
          { new: true }
        )
      },"Failed to reject friend", "UPDATE_ERROR"),
      addUser: wrapResolver(async (parent, { password, email, username }) => {
        const user = await User.create({ password, email, username });
        const token = signToken(user);
        return { token, user };
      },"Failed to add user", "UPDATE_ERROR"),
      login: wrapResolver(async (parent, { username, password }) => {
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
      },"Failed to login", "UPDATE_ERROR"),
      addReview: wrapResolver(async (_, {gameId, rating, reviewText}, context) => {
        //user property comes from session/authentication
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
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
      },"Failed to add review", "UPDATE_ERROR"),
      addToBacklog: wrapResolver(async (_, { gameId }, context) => {
        if (!context.user) {
          throw new AuthenticationError("User not logged in");
        }
        const updatedUser = await User.findByIdAndUpdate(
          {_id : context.user._id},
          { $addToSet: { gamesInBacklog: gameId } },
          { new: true }
        );
        return updatedUser;
      },"Failed to add to backlog", "UPDATE_ERROR"),
      removeFromBacklog: wrapResolver(async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError("User not logged in");
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { gamesInBacklog: gameId } },
          { new: true }
        );
      },"Failed to remove from backlog", "UPDATE_ERROR"),
      addToFavorites: wrapResolver(async (_, { gameId }, context) => {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("User not logged in");
        }
        const updatedUser = await Usxer.findByIdAndUpdate(
          {_id : user._id},
          { $addToSet: { gamesInFavorites: gameId } },
          { new: true }
        );
        return updatedUser;
      },"Failed to add to favorites", "UPDATE_ERROR"),
      removeFromFavorites: wrapResolver(async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError("User not logged in");
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { gamesInFavorites: gameId } },
          { new: true }
        );
      },"Failed to remove from favorites", "UPDATE_ERROR"),
      addToInProgress: wrapResolver(async (_, { gameId }, context) => {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("User not logged in");
        };
        const updatedUser = await User.findByIdAndUpdate(
          {_id : user._id},
          { $addToSet: { gamesInProgress: gameId } },
          { new: true }
        );
        return updatedUser;
      },"Failed to add to in progress", "UPDATE_ERROR"),
      removeFromInProgress: wrapResolver(async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError("User not logged in");
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { gamesInProgress: gameId } },
          { new: true }
        );
      },"Failed to remove from in progress", "UPDATE_ERROR"),
      addToCompleted: wrapResolver(async (_, { gameId }, context) => {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("User not logged in");
        }
        const updatedUser = await User.findByIdAndUpdate(
          {_id : user._id},
          { $addToSet: { gamesCompleted: gameId } },
          { new: true }
        );
        return updatedUser;
      },"Failed to add to completed", "UPDATE_ERROR"),
      removeFromCompleted: wrapResolver(async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError("User not logged in");
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { gamesCompleted: gameId } },
          { new: true }
        );
      },"Failed to remove from completed", "UPDATE_ERROR"),
      addTo100Completed: wrapResolver(async (_, { gameId }, context) => {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("User not logged in");
        };
        const updatedUser = await User.findByIdAndUpdate(
          {_id : user._id},
          { $addToSet: { games100Completed: gameId } },
          { new: true }
        );
        return updatedUser;
      },"Failed to add to 100 completed", "UPDATE_ERROR"),
      removeFrom100Completed: wrapResolver(async (_, { gameId }, { user }) => {
        if (!user) throw new AuthenticationError("User not logged in");
        return User.findByIdAndUpdate(
          user._id,
          { $pull: { games100Completed: gameId } },
          { new: true }
        );
      },"Failed to remove from 100 completed", "UPDATE_ERROR"),
      addLikeToReview: wrapResolver(async (_, { reviewId }, { user }) => {
        if (!user) throw new AuthenticationError("User not logged in");
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
      },"Failed to add like to review", "UPDATE_ERROR"),
      removeLikeFromReview: wrapResolver(async (_, { reviewId }, { user }) => {
        if (!user) throw new AuthenticationError("User not logged in");
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
      },"Failed to remove like from review", "UPDATE_ERROR"),
      changeProfilePic: wrapResolver(async (_, { url }, context) => {
        const { user } = context;
        if (!user) throw new AuthenticationError("User not logged in");
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $set: { profilePictureUrl: url } },
          { new: true }
        );
        return updatedUser;
      },"Failed to change profile pic", "UPDATE_ERROR"),
      saveAiPic: wrapResolver(async (_, { url }, context) => {
        const { user } = context;
        if (!user) throw new AuthenticationError("User not logged in");
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $addToSet: { aiImages: url } },
          { new: true }
        );
        return updatedUser;
      },"Failed to save AI pic", "UPDATE_ERROR"),
    }
};

module.exports = resolvers;

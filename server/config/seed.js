const fetch = require('node-fetch');
const db = require('./connection');
const { User, Game, Review } = require('../models');
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

//Create games
const apiKey = process.env.RAWG_API_KEY;

async function fetchGameData(gameName, apiKey) {
    const searchUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(gameName)}`;
    try {
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      const game = searchData.results[0];

      if (!game) {
        return null
      };

      return {
        title: game.name,
        averageRating: game.rating,
        releaseDate: game.released,
        genre: game.genres.map(genre => genre.name),
        platforms: game.platforms.map(platform => platform.platform.name),
        pictureUrl: game.background_image,
        reviews: []
      };
    } catch (error) {
      console.error("Error fetching game data for " + gameName, error);
      return null;
    }
}

db.once('open', async () => {
    await User.deleteMany();
    await Game.deleteMany();
    await Review.deleteMany();

    const gameTitles = ['Red Dead Redemption', 'Portal 2', 'LA Noire', 'Call of Duty: Black Ops', 'Deathloop', 'Control', 'Journey', 'Hitman: World of Assassination', 'Uncharted 4', 'Battlefield 1'];

    let fetchedGames = [];

    for (const title of gameTitles) {
        const gameData = await fetchGameData(title, apiKey);
        if (gameData) {
          fetchedGames.push(gameData);
        } else {
          console.log(`Game not found: ${title}`);
          
        }
    }

    const gamesAdded = await Game.insertMany(fetchedGames);
    const [game1, game2, game3] = gamesAdded;
    console.log(`${gamesAdded.length} games created successfully.`);
    console.log(fetchedGames);

    // Create users
    const userData = [
        {
            email: 'user@example.com',
            username: 'user',
            password: 'user',
            profilePictureUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
            gamesInFavorites: [],
            gamesInBacklog: [],
            gamesCompleted: [],
            gamesInProgress: [],
            friends: [],
            friendRequests: [],
            likedReviews: [],
            reviews: [],
            hoursPlayed: 100,
            games100Completed: []
        },
        {
            email: 'jane.smith@example.com',
            username: 'janesmith',
            password: 'password123',
            profilePictureUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
            gamesInFavorites: [],
            gamesInBacklog: [],
            gamesCompleted: [],
            gamesInProgress: [],
            friends: [],
            friendRequests: [],
            likedReviews: [],
            reviews: [],
            hoursPlayed: 150,
            games100Completed: []
        },
    ];

    const users = await User.create(userData);
    const [user1, user2] = users;

    // Create reviews
    const reviewData = [
        { 
            user: user1._id, 
            game: gamesAdded[0]._id, 
            rating: 5, 
            reviewText: 'Incredible game!',
            likes: 3,
            dateOfReview: new Date() 
        },
        { 
            user: user2._id, 
            game: gamesAdded[0]._id, 
            rating: 4, 
            reviewText: 'Great game!',
            likes: 8,
            dateOfReview: new Date()  
        },
    ];

    const reviews = await Review.insertMany(reviewData);

    // Update reviews added to games
    game1.reviews.push(reviews[0]._id);
    game1.reviews.push(reviews[1]._id);
    
    await game1.save();
    // Update user relationships
    user1.friends.push(user2._id);
    user2.friends.push(user1._id);
    // Update game relationships
    user1.gamesInBacklog.push(gamesAdded[1]._id);
    user1.games100Completed.push(gamesAdded[2]._id);
    user1.gamesInFavorites.push(gamesAdded[0]._id);
    user1.gamesCompleted.push(gamesAdded[2]._id);
    user1.gamesInProgress.push(gamesAdded[1]._id);
    // Update review relationships
    user1.reviews.push(reviews[0]._id);
    user1.likedReviews.push(reviews[1]._id);
    user2.likedReviews.push(reviews[0]._id);
    user2.reviews.push(reviews[1]._id);

    await user1.save();
    await user2.save();

    console.log('Database seeded successfully.');

    process.exit();
});

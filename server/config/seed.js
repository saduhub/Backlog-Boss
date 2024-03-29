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
        id: game.id,
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

    const gameTitles = [
      'Red Dead Redemption', 
      'Portal 2', 
      'LA Noire', 
      'Call of Duty: Black Ops', 
      'Deathloop', 
      'Control', 
      'Journey', 
      'Hitman: World of Assassination', 
      'Uncharted 4', 
      'Battlefield 1',
      // 'The Legend of Zelda: Breath of the Wild',
      // 'The Witcher 3: Wild Hunt',
      // 'Dark Souls III',
      // 'Mass Effect 2',
      // 'The Elder Scrolls V: Skyrim',
      // 'God of War (2018)',
      // 'BioShock',
      // 'The Last of Us',
      // 'Half-Life 2',
      // 'Grand Theft Auto V',
      // 'Metal Gear Solid V: The Phantom Pain',
      // 'Shadow of the Colossus',
      // 'Halo: Combat Evolved',
      // 'Final Fantasy VII',
      // 'Super Mario Odyssey',
      // 'Bloodborne',
      // 'Celeste',
      // 'Persona 5',
      // 'Minecraft',
      // 'Sekiro: Shadows Die Twice',
      // 'Doom (2016)',
      // 'Overwatch',
      // 'Stardew Valley',
      // 'The Legend of Zelda: Ocarina of Time',
      // 'Super Mario 64',
      // 'Tetris',
      // 'The Sims',
      // 'World of Warcraft',
      // 'Counter-Strike',
      // 'Gran Turismo 7',
      // 'Morrowind',
      // 'Baldur’s Gate II',
      // 'Chrono Trigger',
      // 'Super Metroid',
      // 'Diablo II',
      // 'StarCraft',
      // 'Fallout 3',
      // 'Terraria',
      // 'League of Legends',
      // 'The Legend of Zelda: Majora’s Mask',
      // 'Resident Evil 4',
      // 'Silent Hill 2',
      // 'Portal',
      // 'Super Mario World',
      // 'The Legend of Zelda: A Link to the Past',
      // 'Super Smash Bros. Ultimate',
      // 'Fortnite',
      // 'Rocket League',
      // 'Cuphead',
      // 'Undertale',
      // 'Super Mario Galaxy',
      // 'Gears of War',
      // 'Batman: Arkham City',
      // 'Journey',
      // 'Fire Emblem: Three Houses',
      // 'Animal Crossing: New Horizons',
      // 'Splatoon 2',
      // 'Metal Gear Solid 3: Snake Eater',
      // 'Kingdom Hearts II',
      // 'Dark Souls',
      // 'Elden Ring',
      // 'Hollow Knight',
      // 'Spelunky 2',
      // 'Celeste',
      // 'Inside',
      // 'Limbo',
      // 'Death Stranding',
      // 'Apex Legends',
      // 'Valorant',
      // 'Rainbow Six Siege',
      // 'Assassin’s Creed II',
      // 'Red Dead Redemption 2',
      // 'The Last of Us Part II'
    ];

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
        {
            email: 'jane.smith2@example.com',
            username: 'janesmith2',
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
        {
            email: 'jane.smith3@example.com',
            username: 'janesmith3',
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
        {
            email: 'jane.smith4@example.com',
            username: 'janesmith4',
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
        {
            email: 'jane.smith5@example.com',
            username: 'janesmith5',
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
        {
            email: 'jane.smith6@example.com',
            username: 'janesmith6',
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
        {
            email: 'jane.smith7@example.com',
            username: 'janesmith7',
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
        {
            email: 'jane.smith8@example.com',
            username: 'janesmith8',
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
    const [user1, user2, user3, user4, user5, user6, user7, user8, user9] = users;

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
        { 
          user: user1._id, 
          game: gamesAdded[1]._id, 
          rating: 4, 
          reviewText: 'Good game!',
          likes: 17,
          dateOfReview: new Date() 
        },
    ];

    const reviews = await Review.insertMany(reviewData);

    // Update reviews added to games
    game1.reviews.push(reviews[0]._id);
    game1.reviews.push(reviews[1]._id);
    await game1.save();
    game2.reviews.push(reviews[2]._id);
    await game2.save();
    // Update user relationships
    user1.friends.push(user2._id);
    user1.friends.push(user3._id);
    user1.friends.push(user4._id);
    user1.friends.push(user5._id);
    user1.friendRequests.push(user6._id);
    user1.friendRequests.push(user7._id);
    await user1.save();
    user2.friends.push(user1._id);
    await user2.save();
    user3.friends.push(user1._id);
    await user3.save();
    user4.friends.push(user1._id);
    await user4.save();
    user5.friends.push(user1._id);
    await user5.save();
    user6.friends.push(user1._id);
    await user6.save();
    user7.friends.push(user1._id);
    await user7.save();
    // Update game relationships
    user1.gamesInBacklog.push(gamesAdded[1]._id);
    user1.games100Completed.push(gamesAdded[2]._id);
    user1.gamesInFavorites.push(gamesAdded[0]._id);
    user1.gamesCompleted.push(gamesAdded[2]._id);
    user1.gamesInProgress.push(gamesAdded[1]._id);
    // Update review relationships
    user1.reviews.push(reviews[0]._id);
    user1.reviews.push(reviews[2]._id);
    user1.likedReviews.push(reviews[1]._id);
    user2.likedReviews.push(reviews[0]._id);
    user2.reviews.push(reviews[1]._id);

    await user1.save();
    await user2.save();

    console.log('Database seeded successfully.');

    process.exit();
});

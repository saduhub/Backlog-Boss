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
      'The Legend of Zelda: Breath of the Wild',
      'The Witcher 3: Wild Hunt',
      'Dark Souls III',
      'Mass Effect 2',
      'The Elder Scrolls V: Skyrim',
      'God of War (2018)',
      'BioShock',
      'The Last of Us',
      'Half-Life 2',
      'Grand Theft Auto V',
      'Metal Gear Solid V: The Phantom Pain',
      'Shadow of the Colossus',
      'Halo: Combat Evolved',
      'Final Fantasy VII',
      'Super Mario Odyssey',
      'Bloodborne',
      'Celeste',
      'Persona 5',
      'Minecraft',
      'Sekiro: Shadows Die Twice',
      'Doom (2016)',
      'Overwatch',
      'Stardew Valley',
      'The Legend of Zelda: Ocarina of Time',
      'Super Mario 64',
      'Tetris',
      'The Sims',
      'World of Warcraft',
      'Counter-Strike',
      'Gran Turismo 7',
      'Morrowind',
      'Baldur’s Gate II',
      'Chrono Trigger',
      'Super Metroid',
      'Diablo II',
      'StarCraft',
      'Fallout 3',
      'Terraria',
      'League of Legends',
      'The Legend of Zelda: Majora’s Mask',
      'Resident Evil 4',
      'Silent Hill 2',
      'Portal',
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
    const [game1, game2, game3, game4, game5, game6, game7, game8, game9, game10, game11, game12, game13, game14, game15, game16, game17, game18, game19, game20, game21, game22, game23, game24, game25, game26, game27, game28, game29, game30, game31, game32, game33, game34, game35, game36, game37, game38, game39, game40, game41, game42, game43, game44, game45, game46, game47, game48, game49, game50, game51, game52, game53, game54, game55, game56, game57, game58, game59, game60, game61, game62, game63, game64, game65, game66, game67, game68, game69, game70, game71, game72, game73, game74, game75, game76, game77, game78, game79, game80] = gamesAdded;

    console.log(`${gamesAdded.length} games created successfully.`);
    console.log(fetchedGames);

    // Create users
    const userData = [
        {
            email: 'backlogboss@example.com',
            username: 'backlogboss',
            password: 'backlogboss',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1689908332/TuneStack/vpardqd8t71yai2bdzo8.jpg',
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
            email: 'pixel123@example.com',
            username: 'pixel123',
            password: 'pixel123',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1674170364/samples/animals/reindeer.jpg',
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
            email: 'vista27@example.com',
            username: 'vista27',
            password: 'vista27',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1674170363/samples/animals/cat.jpg',
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
            email: 'flux321@example.com',
            username: 'flux321',
            password: 'flux321',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1674170363/samples/food/dessert.jpg',
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
            email: 'echo49@example.com',
            username: 'echo49',
            password: 'echo49',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1674170363/samples/ecommerce/analog-classic.jpg',
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
            email: 'byte37@example.com',
            username: 'byte37',
            password: 'byte37',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1674170360/sample.jpg',
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
            email: 'zero17@example.com',
            username: 'zero17',
            password: 'zero17',
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
            email: 'quantum99@example.com',
            username: 'quantum99',
            password: 'quantum99',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1674170385/cld-sample-5.jpg',
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
            email: 'castle02@example.com',
            username: 'castle02',
            password: 'castle02',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1674170384/cld-sample-2.jpg',
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
            email: 'glass57@example.com',
            username: 'glass57',
            password: 'glass57',
            profilePictureUrl: 'https://res.cloudinary.com/dx7bgdfut/image/upload/v1674170384/cld-sample-3.jpg',
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
    const [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10] = users;

    // Create reviews
    const reviewData = [
        { 
            user: user1._id, 
            game: gamesAdded[10]._id, 
            rating: 5, 
            reviewText: 'Incredible game!',
            likes: 17,
            dateOfReview: new Date() 
        },
        { 
            user: user2._id, 
            game: gamesAdded[35]._id, 
            rating: 4, 
            reviewText: 'Great game!',
            likes: 82,
            dateOfReview: new Date()  
        },
        { 
            user: user2._id, 
            game: gamesAdded[36]._id, 
            rating: 5, 
            reviewText: 'A great time playing!',
            likes: 42,
            dateOfReview: new Date()  
        },
        { 
          user: user1._id, 
          game: gamesAdded[11]._id, 
          rating: 4, 
          reviewText: 'Good game!',
          likes: 52,
          dateOfReview: new Date() 
        },
        { 
          user: user2._id, 
          game: gamesAdded[37]._id, 
          rating: 2, 
          reviewText: 'It is an ok game.',
          likes: 31,
          dateOfReview: new Date() 
        },
    ];

    const reviews = await Review.insertMany(reviewData);

    // Update reviews added to games
    game10.reviews.push(reviews[0]._id);
    game11.reviews.push(reviews[3]._id);
    await game10.save();
    await game11.save();
    game35.reviews.push(reviews[1]._id);
    game36.reviews.push(reviews[2]._id);
    game37.reviews.push(reviews[4]._id);
    await game35.save();
    await game36.save();
    await game37.save();
    // Update user relationships
    user1.friends.push(user2._id);
    user1.friends.push(user3._id);
    user1.friends.push(user4._id);
    user1.friends.push(user5._id);
    user1.friendRequests.push(user6._id);
    user1.friendRequests.push(user7._id);
    user1.friendRequests.push(user8._id);
    await user1.save();
    user2.friends.push(user1._id);
    user2.friends.push(user3._id);
    user2.friends.push(user4._id);
    user2.friends.push(user5._id);
    user2.friends.push(user6._id);
    user2.friends.push(user7._id);
    await user2.save();
    user3.friends.push(user1._id);
    await user3.save();
    user4.friends.push(user1._id);
    await user4.save();
    user5.friends.push(user1._id);
    await user5.save();
    // Update game relationships
    // user1
    user1.gamesInBacklog.push(gamesAdded[0]._id);
    user1.gamesInBacklog.push(gamesAdded[1]._id);
    user1.gamesInBacklog.push(gamesAdded[2]._id);
    user1.gamesInBacklog.push(gamesAdded[3]._id);
    user1.gamesInBacklog.push(gamesAdded[4]._id);
    user1.gamesInBacklog.push(gamesAdded[5]._id);
    user1.gamesInBacklog.push(gamesAdded[6]._id);
    user1.gamesInBacklog.push(gamesAdded[7]._id);
    user1.gamesInBacklog.push(gamesAdded[8]._id);
    user1.gamesInBacklog.push(gamesAdded[9]._id);
    user1.gamesInFavorites.push(gamesAdded[10]._id);
    user1.gamesInFavorites.push(gamesAdded[11]._id);
    user1.gamesInFavorites.push(gamesAdded[12]._id);
    user1.gamesInFavorites.push(gamesAdded[13]._id);
    user1.gamesInFavorites.push(gamesAdded[14]._id);
    user1.gamesInFavorites.push(gamesAdded[15]._id);
    user1.gamesInFavorites.push(gamesAdded[16]._id);
    user1.gamesInFavorites.push(gamesAdded[17]._id);
    user1.games100Completed.push(gamesAdded[10]._id);
    user1.games100Completed.push(gamesAdded[11]._id);
    user1.games100Completed.push(gamesAdded[12]._id);
    user1.gamesCompleted.push(gamesAdded[13]._id);
    user1.gamesCompleted.push(gamesAdded[14]._id);
    user1.gamesCompleted.push(gamesAdded[15]._id);
    user1.gamesCompleted.push(gamesAdded[16]._id);
    user1.gamesCompleted.push(gamesAdded[17]._id);
    user1.gamesInProgress.push(gamesAdded[18]._id);
    user1.gamesInProgress.push(gamesAdded[19]._id);
    user1.gamesInProgress.push(gamesAdded[20]._id);
    user1.gamesInProgress.push(gamesAdded[21]._id);
    user1.gamesInProgress.push(gamesAdded[22]._id);
    user1.gamesInProgress.push(gamesAdded[23]._id);
    // user2
    user2.gamesInBacklog.push(gamesAdded[24]._id);
    user2.gamesInBacklog.push(gamesAdded[25]._id);
    user2.gamesInBacklog.push(gamesAdded[26]._id);
    user2.gamesInBacklog.push(gamesAdded[27]._id);
    user2.gamesInBacklog.push(gamesAdded[28]._id);
    user2.gamesInBacklog.push(gamesAdded[29]._id);
    user2.gamesInBacklog.push(gamesAdded[30]._id);
    user2.gamesInBacklog.push(gamesAdded[31]._id);
    user2.gamesInBacklog.push(gamesAdded[32]._id);
    user2.gamesInBacklog.push(gamesAdded[33]._id);
    user2.gamesInBacklog.push(gamesAdded[34]._id);
    user2.gamesInFavorites.push(gamesAdded[35]._id);
    user2.gamesInFavorites.push(gamesAdded[36]._id);
    user2.gamesInFavorites.push(gamesAdded[37]._id);
    user2.gamesInFavorites.push(gamesAdded[38]._id);
    user2.gamesInFavorites.push(gamesAdded[39]._id);
    user2.gamesInFavorites.push(gamesAdded[40]._id);
    user2.gamesInFavorites.push(gamesAdded[41]._id);
    user2.games100Completed.push(gamesAdded[35]._id);
    user2.games100Completed.push(gamesAdded[36]._id);
    user2.games100Completed.push(gamesAdded[37]._id);
    user2.games100Completed.push(gamesAdded[38]._id);
    user2.gamesCompleted.push(gamesAdded[39]._id);
    user2.gamesCompleted.push(gamesAdded[40]._id);
    user2.gamesCompleted.push(gamesAdded[41]._id);
    user2.gamesInProgress.push(gamesAdded[42]._id);
    user2.gamesInProgress.push(gamesAdded[43]._id);
    user2.gamesInProgress.push(gamesAdded[44]._id);
    // Update review relationships
    user1.reviews.push(reviews[0]._id);
    user1.reviews.push(reviews[3]._id);
    user1.likedReviews.push(reviews[1]._id);
    user2.likedReviews.push(reviews[3]._id);
    user2.reviews.push(reviews[1]._id);
    user2.reviews.push(reviews[2]._id);
    user2.reviews.push(reviews[4]._id);

    await user1.save();
    await user2.save();

    console.log('Database seeded successfully.');

    process.exit();
});

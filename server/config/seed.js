const db = require('./connection');
const { User, Game, Review } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await Game.deleteMany();
    await Review.deleteMany();

    // Create games
    const gameData = [
        { 
            title: 'Epic Adventure', 
            averageRating: 4.5, 
            releaseDate: new Date(), 
            genre: ['Adventure', 'RPG'], 
            platforms: ['PC', 'Console'], 
            pictureUrl: 'https://images.gog-statics.com/3e1987178b1eec9554958ec8027e7714fb0acd0fc8ef69bb192e16662b61f3a0.jpg',
            reviews: [] 
        },
        { 
            title: 'Space Quest', 
            averageRating: 4.0, 
            releaseDate: new Date(), 
            genre: ['Action', 'Sci-Fi'], 
            platforms: ['PC'], 
            pictureUrl: 'https://images.gog-statics.com/3e1987178b1eec9554958ec8027e7714fb0acd0fc8ef69bb192e16662b61f3a0.jpg',
            reviews: []  
        },
        { 
            title: 'Mystery Island', 
            averageRating: 4.8, 
            releaseDate: new Date(), 
            genre: ['Puzzle', 'Adventure'], 
            platforms: ['Mobile'], 
            pictureUrl: 'https://images.gog-statics.com/3e1987178b1eec9554958ec8027e7714fb0acd0fc8ef69bb192e16662b61f3a0.jpg', 
            reviews: [] 
        },
    ];

    const games = await Game.insertMany(gameData);
    const [game1, game2, game3] = games;

    // Create users
    const userData = [
        {
            email: 'john.doe@example.com',
            username: 'johndoe',
            password: 'password123',
            profilePictureUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
            gamesInFavorites: [],
            gamesInBacklog: [],
            gamesCompleted: [],
            gamesInProgress: [],
            friends: [],
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
            game: games[0]._id, 
            rating: 5, 
            reviewText: 'Incredible game!',
            likes: 3,
            dateOfReview: new Date() 
        },
        { 
            user: user2._id, 
            game: games[0]._id, 
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
    user1.gamesInBacklog.push(games[1]._id);
    user1.games100Completed.push(games[2]._id);
    user1.gamesInFavorites.push(games[0]._id);
    user1.gamesCompleted.push(games[2]._id);
    user1.gamesInProgress.push(games[1]._id);
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

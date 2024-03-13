const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    averageRating: { 
        type: Number, 
        default: 0 
    },
    releaseDate: { 
        type: String,
    },
    genre: [
        String
    ],
    platforms: [
        String
    ],
    pictureUrl: { 
        type: String 
    },
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Review' 
    }]
});
  
const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
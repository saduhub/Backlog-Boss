const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    game: { 
        type: Schema.Types.ObjectId, 
        ref: 'Game', 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    dateOfReview: { 
        type: Date, 
        default: Date.now 
    },
    reviewText: { 
        type: String, 
        required: true 
    }
});
  
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
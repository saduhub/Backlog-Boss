const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    profilePictureUrl: { 
        type: String,
    },
    gamesInFavorites: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Game' 
    }],
    gamesInBacklog: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Game' 
    }],
    gamesCompleted: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Game' 
    }],
    gamesInProgress: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Game' 
    }],
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    friendRequests: [{
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    likedReviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Review' 
    }],
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Review' 
    }],
    hoursPlayed: { 
        type: Number, 
        default: 0 
    },
    games100Completed: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Game' 
    }],
    aiImages: [{
        type: String
    }]
});

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
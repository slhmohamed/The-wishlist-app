const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},
    {
        timestamps: true
    }

);

const WishListModel = mongoose.model('wishlists', wishlistSchema)
exports.WishListModel = WishListModel
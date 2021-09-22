const { WishListModel } = require('../models/wishlist-model');
const { ProductModel } = require('../models/product-model');
const ObjectId = require('mongoose').Types.ObjectId;

const wishlistDetails = (req, res, next) => {
   
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);

    WishListModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("id unknown:" + err);
    })
};


const getAll = async (req, res) => {
    
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);

    WishListModel.find({ posterId: req.params.id }, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("id unknown:" + err);
    })
};

const wishlistToBuy = async (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);

    await ProductModel.find({ wishlistID: req.params.id, status: "To Buy" }, (err, docs) => {
        if (!err) res.status(200).send(docs)
        else console.log("id unknown:" + err);
    })
};


const wishlistBought = async (req, res) => {
    
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);

    await ProductModel.find({ wishlistID: req.params.id, status: "Bought" }, (err, docs) => {
        if (!err) res.status(200).send(docs)
        else console.log("id unknown:" + err);
    })
};

const addWishlist = async (req, res) => {

    let newWishlist = new WishListModel({
        posterId: req.body.posterId,
        name: req.body.name
    })
    try {
       
        const wishlist = await newWishlist.save();

        return res.status(201).json(wishlist);
    }

    catch (err) {
        return res.status(500).json({ message: err });
    }
}

const deleteWishlist = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(200).send({ message: "Id unknown:" + req.params.id })
    try {
        await WishListModel.deleteOne({ _id: req.params.id }).exec();
        res.status(500).json({ message: "Successfuly deleted . " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports = {
    addWishlist,
    deleteWishlist,
    getAll,
    wishlistDetails,
    wishlistToBuy,
    wishlistBought

}
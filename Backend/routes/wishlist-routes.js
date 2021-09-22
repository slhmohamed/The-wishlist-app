const express=require('express');
const { addWishlist,getAll,wishlistDetails,deleteWishlist,wishlistToBuy,wishlistBought} = require('../controllers/wishlistController');
const auth = require('../middelware/auth');

const router =express.Router();
router.post('/addWishlist',auth,addWishlist,);

router.get('/getAll/:id',auth,getAll);

 router.get('/wishlistDetails/:id',auth,wishlistDetails)
 router.get('/wishlistToBuy/:id',auth,wishlistToBuy)
 router.get('/wishlistBought/:id',auth,wishlistBought)


 router.delete('/deleteWishlist/:id',auth,deleteWishlist)

module.exports={
    routes:router
}
const express=require('express');

const multer  = require('multer');
const { addProduct,productByPosterId,getProductById,deleteProduct,updateProduct} = require('../controllers/productController');
const auth = require('../middelware/auth');
const upload=multer({dest:__dirname + '/../src/files'})
const router =express.Router();

router.post('/addProduct',upload.single('fichier'),auth,addProduct);

router.get('/productByPosterId/:id',auth,productByPosterId);
router.get('/getProductById/:id',auth,getProductById);
router.delete('/deleteProduct/:id',auth,deleteProduct);
router.put('/updateProduct/:id',auth,updateProduct)
 

module.exports={
    routes:router
}
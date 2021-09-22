
const { ProductModel } = require('../models/product-model');
const fs = require("fs")
const ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');

const upload = multer({ dest: __dirname + '/../src/files' })

const addProduct = (req, res) => {

    try {
        const file = __dirname + '/../src/files/' + req.file.originalname;

        fs.readFile(req.file.path, function (err, data) {
            fs.writeFile(file, data, function (err) {
                if (err)
                    res.json({ INFO: err });
                else {
                    let pathPicture = req.file.originalname
   

                    const newProduct = new ProductModel({
                        name: req.body.name,
                        price: req.body.price,
                        curency: req.body.curency,
                        description: req.body.description,
                        picture: pathPicture,
                        wishlistID: req.body.wishlistID,
                        status: req.body.status,
                        posterId: req.body.posterId,

                    })
          
                    const product = newProduct.save();


                    return res.status(201).json(product);

                }

            });
        });

    } catch (err) {
        return res.status(500).json({ message: err })
    }

}


const productByPosterId = async (req, res) => {
 
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);

    await ProductModel.find( {posterId:req.params.id}, (err, docs) => {
        if (!err) res.status(200).send(docs)
        else console.log("id unknown:" + err);
    })
};
const updateProduct = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown' + req.params.id)
    try {
        await ProductModel.findOneAndUpdate(
            {
                _id: req.params.id
            },

            {
                $set: {
                    wishlistID: req.body.wishlistID,
                    status: req.body.status
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })
    }

}

const getProductById=async(req,res)=>{
 
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);

    await ProductModel.findById({_id:req.params.id}, (err, docs) => {
        if (!err) res.status(200).send(docs)
        else console.log("id unknown:" + err);
    })
}
const deleteProduct = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(200).send({ message: "Id unknown:" + req.params.id })
    try {
        await ProductModel.deleteOne({ _id: req.params.id }).exec();
        res.status(500).json({ message: "Successfuly deleted . " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
 

module.exports = {
    addProduct,
    updateProduct,
    productByPosterId,
    getProductById,
    deleteProduct
}
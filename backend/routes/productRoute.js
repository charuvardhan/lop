import express from 'express';
import productModel from '../models/productModel';
import { getToken,isAuth, isAdmin} from '../util';


const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productModel.find({});
    res.send(products);
});

router.get('/:id', async (req, res) => {
    const product = await productModel.findOne({_id: req.params.id});
    if(product){
        res.send(product);
    }else{
        res.status(404).send({msg: 'Product Not Found'});
    }
    
});
router.post('/', async (req, res) => {
    const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({msg: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({msg: 'Error in creating product'});
})

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if(product){
        product.name= req.body.name;
        product.price= req.body.price;
        product.image= req.body.image;
        product.brand= req.body.brand;
        product.category= req.body.category;
        product.countInStock= req.body.countInStock;
        product.description= req.body.description;
    const updatedProduct = await product.save();
    if(updatedProduct){
        return res.status(200).send({msg: 'Product Updated', data: updatedProduct });
    }
}
    return res.status(500).send({msg: 'Error in updating product'});
})

router.delete('/:id', async (req,res) => {
    const deleteProduct = await productModel.findById(req.params.id);
    if(deleteProduct){
        await deleteProduct.remove();
        res.send({msg: 'PRoduct Deleted'});
    }else {
        res.send('Error in Deletion');
    }
})

export default router;
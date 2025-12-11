const express=require('express');
const Router=express.Router();
const {protect}=require("../middleware/middleware.js");
const {allProducts,createProduct,editProduct,deleteProduct,myProducts, getProduct}=require("../controllers/product.js");
Router.get('/',allProducts);
Router.get('/:id',getProduct);
Router.get('/myProducts',protect,myProducts);
Router.post('/',protect,createProduct);
Router.put('/:id',protect,editProduct);

Router.delete('/:id',protect,deleteProduct);

module.exports=Router;
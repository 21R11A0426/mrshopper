const Product=require("../models/product.js");
module.exports.allProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('user', 'name'); 
       
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        console.log("error in getAllProducts", error);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports.myProducts=async (req, res) => {
    try {
       
        const products = await Product.find({ user: req.user._id });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in getMyProducts", error);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports.createProduct=async (req, res) => {
    try {
        const { text, quantity, image,price } = req.body;

        if (!text || !quantity || !price) {
            return res.status(400).json({ message: "required all fields" });
        }

        const newproduct = await Product.create({
            text,
            quantity,
            image: image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price,
            user: req.user._id, 
        });

        res.status(201).json({ success: true, data: newproduct });
    } catch (error) {
        console.log("error in createProduct", error);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports.editProduct=async (req, res) => {
    try {
        const item = await Product.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

 
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this item" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log("error in updateProduct", error);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports.deleteProduct=async (req, res) => {
    try {
        const item = await Product.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

   
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this item" });
        }

        const deleteditem=await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "Item deleted", id: req.params.id });
    } catch (error) {
        console.log("error in deleteProduct", error);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid Product ID" });
        }
        const product = await Product.findById(id).populate('user', 'username');

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error in getProduct:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
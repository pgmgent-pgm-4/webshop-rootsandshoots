import Product from "../models/Products.js"
import Review from "../models/Reviews.js"

Product.hasMany(Review, { foreignKey: 'product_id'});

export const getProducts = async (req, res) => {
    const products = await Product.findAll();
    res.status(200).json(products)
}

export const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const selectedProduct = await Product.findAll({
            where: {
                id: productId
            }
        });
        console.log("this is selected", selectedProduct);
        if (!selectedProduct) throw new Error("Product not found!");
        res.status(200).json(selectedProduct)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const selectedProduct = await Product.destroy({
            where: {
                id: productId
            }
        });
        console.log("this is selected", selectedProduct);
        if (!selectedProduct) throw new Error("Product not found!");
        res.status(200).json(selectedProduct)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}
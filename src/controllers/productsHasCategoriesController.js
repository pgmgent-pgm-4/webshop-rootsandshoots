import ProductHasCategories from "../models/ProductsHasCategories.js";
import Product from "../models/Products.js"
import Category from "../models/Categories.js";

export const getProductsHasCategories = async (req, res) => {
    const productsHaveCategories = await ProductHasCategories.findAll();
    res.status(200).json(productsHaveCategories);
}

export const getProductHasCategories = async (req, res) => {
    try {
        const id = req.params.id;
        const selectedProductCategories = await ProductHasCategories.findAll({
            where: {
                id: id
            }
        });
        if (!selectedProductCategories) throw new Error("Product not found!");
        res.status(200).json(selectedProductCategories)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}
export const deleteProductHasCategories = async (req, res) => {
    try {
        const producthascategoriesId = req.params.id;
        const selectedProductHasCategories = await ProductHasCategories.destroy({
            where: {
                id: producthascategoriesId
            }
        });
        console.log("this is selected", selectedProductHasCategories);
        if (!selectedProductHasCategories) throw new Error("ProductHasCategories not found!");
        res.status(200).json(selectedProductHasCategories)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}
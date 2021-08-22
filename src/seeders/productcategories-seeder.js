import faker from "faker"
import ProductHasCategories from "../models/ProductsHasCategories.js";
import Product from "../models/Products.js";
import Category from "../models/Categories.js";

const ProductCategoriesSeeder = async (req, res) => {
    /*
    let productamount = await Product.findAndCountAll().then((result) => {
        return result.count;
    });

    let categoryamount = await Category.findAndCountAll().then((result) => {
        return result.count;
    })

    console.log(productamount);
    console.log(categoryamount);
    */
    let data = [];
    let amount = 300;

    while (amount--) {
        data.push({
            product_id: Math.floor(Math.random() * 120) +1,
            category_id: Math.floor(Math.random() * 10) +1,
        });
    }

    ProductHasCategories.bulkCreate(data);
}

export default ProductCategoriesSeeder;
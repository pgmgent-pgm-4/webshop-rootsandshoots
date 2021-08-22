import faker from "faker"
import Category from "../models/Categories.js";

const CategorySeeder = async (req, res) => {
    let amount = 10;
    let categories = ["indoor plants", "outdoor plants", "exotic plants", "air purifying", "animal friendly", "easy to maintain", "european", "asian", "african", "south american"];

    let data = [];
    categories.forEach((item) => {
        data.push({
            category_name: item,
        });
    })
        
    Category.bulkCreate(data);
}

export default CategorySeeder
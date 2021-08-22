import Category from "../models/Categories.js"

export const getCategories = async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).json(categories)
}

export const getCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const selectedCategory = await Category.findAll({
            where: {
                id: categoryId
            }
        });
        console.log("this is selected", selectedCategory);
        if (!selectedCategory) throw new Error("Category not found!");
        res.status(200).json(selectedCategory)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const selectedCategory = await Category.destroy({
            where: {
                id: categoryId
            }
        });
        console.log("this is selected", selectedCategory);
        if (!selectedCategory) throw new Error("Category not found!");
        res.status(200).json(selectedCategory)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}
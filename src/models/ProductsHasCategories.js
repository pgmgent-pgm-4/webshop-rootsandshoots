import { Sequelize } from "sequelize";
import db from "../utils/database.js"

const ProductHasCategories = db.define("productshascategories", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

export default ProductHasCategories
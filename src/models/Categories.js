import { Sequelize } from "sequelize";
import db from "../utils/database.js"

const Category = db.define("categories", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export default Category
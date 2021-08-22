import { Sequelize } from "sequelize";
import db from "../utils/database.js"

const Product = db.define("products", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    size: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    onSale: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    new: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export default Product
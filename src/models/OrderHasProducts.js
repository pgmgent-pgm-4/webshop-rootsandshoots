import { Sequelize } from "sequelize";
import db from "../utils/database.js"

const OrderHasProduct = db.define("orderhasproducts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

export default OrderHasProduct
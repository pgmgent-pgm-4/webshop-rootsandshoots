import { Sequelize } from "sequelize";
import db from "../utils/database.js"

const Order = db.define("orders", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    completed: {
        type: Sequelize.BOOLEAN,
    }
});

export default Order
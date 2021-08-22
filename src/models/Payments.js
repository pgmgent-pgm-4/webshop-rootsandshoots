import { Sequelize } from "sequelize";
import db from "../utils/database.js"

const Payment = db.define("payments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    order_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

export default Payment
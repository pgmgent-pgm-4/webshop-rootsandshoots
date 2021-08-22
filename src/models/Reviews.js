import { Sequelize } from "sequelize";
import db from "../utils/database.js"

const Review = db.define("reviews", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    review: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

export default Review
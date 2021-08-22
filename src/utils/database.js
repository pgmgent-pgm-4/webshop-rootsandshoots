import { Sequelize } from "sequelize"
import pkg from 'sequelize'

const { DataTypes } = pkg;

const db = new Sequelize({
    dialect: "sqlite",
    storage: "./src/db/webshop.db3",
})

export default db
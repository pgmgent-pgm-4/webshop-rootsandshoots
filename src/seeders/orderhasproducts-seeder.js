import faker from "faker"
import OrderHasProduct from "../models/OrderHasProducts.js";

const OrderHasProductsSeeder = async (req, res) => {
    let data = [];
    let amount = 80;

    while (amount--) {
        data.push({
            product_id: faker.random.number({
                'min': 1,
                'max': 120,
            })
        });
    }

    OrderHasProduct.bulkCreate(data);
}

export default OrderHasProductsSeeder;
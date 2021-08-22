import faker from "faker"
import Order from "../models/Orders.js";

const OrderSeeder = async (req, res) => {
    let data = [];
    let amount = 80;

    while (amount--) {
        data.push({
            user_id: faker.random.number({
                'min': 1,
                'max': 20,
            }),
            order_id: faker.random.number({
                'min': 1,
                'max': 500,
            }),
            completed: faker.random.boolean(),
        });
    }

    Order.bulkCreate(data);
}

export default OrderSeeder;
import faker from "faker"
import Payment from "../models/Payments.js";

const PaymentSeeder = async (req, res) => {
    let data = [];
    let amount = 20;

    while (amount--) {
        data.push({
            user_id: faker.commerce.department(),
            order_id: faker.random.number({
                'min': 1,
                'max': 500,
            }),
            order_amount: faker.random.number(),
        });
    }

    Payment.bulkCreate(data);
}

export default PaymentSeeder;
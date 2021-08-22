import faker from "faker"
import Review from "../models/Reviews.js";

const ReviewSeeder = async (req, res) => {
    let data = [];
    let amount = 100;

    while (amount--) {
        data.push({
            author: faker.name.firstName(),
            review: faker.lorem.sentence(),
            stars: faker.random.number({
                'min': 0,
                'max': 5,
            }),
            product_id: Math.floor(Math.random() * 120) +1,
            user_id: Math.floor(Math.random() * 20) +1,
        });
    }

    Review.bulkCreate(data);
}

export default ReviewSeeder
import faker from "faker"
import Product from "../models/Products.js";
import Review from "../models/Reviews.js";
import { fetchImageUrl } from "../utils/productImages.js";

Product.hasMany(Review, { foreignKey: 'product_id'});

const UNSPLASH_IMAGE_API = "https://source.unsplash.com/500x500?";

const ProductSeeder = async (req, res) => {
    let data = [];
    let amount = 120;

    while (amount--) {
        const name = faker.commerce.product();
        const product = {
            name: faker.commerce.product(),
            product_id: faker.random.number({
                'min': 1,
                'max': 500,
            }),
            price: faker.random.number({
                'min': 5,
                'max': 100,
            }),
            description: faker.lorem.lines(),
            size: faker.random.number({
                'min': 10,
                'max': 150,
            }),
            tags: faker.lorem.sentence(),
            onSale: faker.random.boolean(),
            new: faker.random.boolean(),
            image: await fetchImageUrl(`${UNSPLASH_IMAGE_API}${faker.helpers.slugify(name.toLowerCase())}`),
        };
        data.push(product);
        console.log(`Created new fake product: ${product.name}`)
    }

    Product.bulkCreate(data);
}

export default ProductSeeder;
import CategorySeeder from "./categories-seeder.js";
import ProductSeeder from "./products-seeder.js";
import ReviewSeeder from "./reviews_seeder.js";
import UserSeeder from "./users-seeder.js";
import OrderSeeder from "./order-seeder.js";
import PaymentSeeder from "./payment-seeder.js";
import ProductCategoriesSeeder from "./productcategories-seeder.js";
import OrderHasProductsSeeder from "./orderhasproducts-seeder.js";

const seed = async (req, res) => {
        const bulkCategory = await CategorySeeder;
        const bulkProduct = await ProductSeeder;
        const bulkReview = await ReviewSeeder;
        const bulkUser = await UserSeeder;
        const bulkOrder = await OrderSeeder;
        const bulkPayment = await PaymentSeeder;
        const bulkProductCategories = await ProductCategoriesSeeder;
        const bulkOrderHasProducts = await OrderHasProductsSeeder;

        bulkCategory(),
        bulkProduct(),
        bulkReview(),
        bulkUser(),
        bulkOrder(),
        bulkPayment(),
        bulkProductCategories(),
        bulkOrderHasProducts()
}

// INIT SEEDER

seed();
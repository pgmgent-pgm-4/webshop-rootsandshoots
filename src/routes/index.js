import express from "express"
import db from "../utils/database.js"

import * as categoriesController from "../controllers/categoriesController.js"
import * as productsController from "../controllers/productsController.js"
import * as reviewsController from "../controllers/reviewsController.js"
import * as productHasReviewsController from "../controllers/productHasReviewsController.js"
import * as profilesController from "../controllers/profilesController.js"
import * as usersController from "../controllers/usersController.js"
import * as ordersController from "../controllers/ordersController.js"
import * as paymentsController from "../controllers/paymentsController.js"
import * as productsHasCategoriesController from "../controllers/productsHasCategoriesController.js"
import * as orderHasProductsController from "../controllers/orderHasProductsController.js"

/*
Make a router
*/
const app = express();
const router = express.Router();

// SYNC DATABASE

db.sync()

// GET CATEGORIES
router.get("/categories", categoriesController.getCategories);
router.get("/categories/:id", categoriesController.getCategory);
router.delete("/categories/:id", categoriesController.deleteCategory);

router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProduct);
router.delete("/products/:id", productsController.deleteProduct);

router.get("/reviews", reviewsController.getReviews);
router.get("/reviews/:id", reviewsController.getReview);
router.delete("/reviews/:id", reviewsController.deleteReview);

router.get("/reviews/product/:productid", productHasReviewsController.getProductReviews);
router.get("/reviews/product/:productid/:id", productHasReviewsController.getProductReview);
router.delete("/reviews/product/:id", productHasReviewsController.deleteReview);

router.get("/profiles", profilesController.getProfiles);
router.get("/profiles/:id", profilesController.getProfile);
router.delete("/profiles/:id", profilesController.deleteProfile);

router.get("/users", usersController.getUsers);
router.get("/users/:id", usersController.getUser);
router.delete("/users/:id", usersController.deleteUser);

router.get("/orders", ordersController.getOrders);
router.get("/orders/:id", ordersController.getOrder);
router.delete("/orders/:id", ordersController.deleteOrder);

router.get("/payments", paymentsController.getPayments);
router.get("/payments/:id", paymentsController.getPayment);
router.delete("/payments/:id", paymentsController.deletePayment);

router.get("/producthascategories", productsHasCategoriesController.getProductsHasCategories);
router.get("/producthascategories/:id", productsHasCategoriesController.getProductHasCategories);
router.delete("/producthascategories/:id", productsHasCategoriesController.deleteProductHasCategories);

router.get("/orderhasproducts", orderHasProductsController.getOrderHasProducts);
router.get("/orderhasproducts/:id", orderHasProductsController.getOrderHasProduct);
router.delete("/orderhasproducts/:id", orderHasProductsController.deleteOrderHasProduct);

export { router as api };
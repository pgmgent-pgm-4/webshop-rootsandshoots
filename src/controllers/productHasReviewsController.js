import Product from "../models/Products.js"
import Review from "../models/Reviews.js"

export const getProductReviews = async (req, res) => {
    const productId = req.params.productid;
    const reviews = await Review.findAll({
        where: {
            productId: productId
        }
    });
    res.status(200).json(reviews);
}

export const getProductReview = async (req, res) => {
    try {
        const productId = req.params.productid;
        const id = req.params.id;
        const selectedReviews = await Review.findAll({
            where: {
                productId: productId,
                id: id
            }
        });
        if (!selectedReviews) throw new Error("Product not found!");
        res.status(200).json(selectedReviews)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const selectedReview = await Review.destroy({
            where: {
                id: reviewId
            }
        });
        console.log("this is selected", selectedReview);
        if (!selectedReview) throw new Error("Review not found!");
        res.status(200).json(selectedReview)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}
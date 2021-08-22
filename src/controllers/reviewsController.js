import Review from "../models/Reviews.js"

export const getReviews = async (req, res) => {
    const reviews = await Review.findAll();
    res.status(200).json(reviews)
}

export const getReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const selectedReview = await Review.findAll({
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
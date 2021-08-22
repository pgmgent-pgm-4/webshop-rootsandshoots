import Payment from "../models/Payments.js"

export const getPayments = async (req, res) => {
    const payments = await Payment.findAll();
    res.status(200).json(payments)
}

export const getPayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const selectedPayment = await Payment.findAll({
            where: {
                id: paymentId
            }
        });
        console.log("this is selected", selectedPayment);
        if (!selectedPayment) throw new Error("Payment not found!");
        res.status(200).json(selectedPayment)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const selectedPayment = await Payment.destroy({
            where: {
                id: paymentId
            }
        });
        console.log("this is selected", selectedPayment);
        if (!selectedPayment) throw new Error("Payment not found!");
        res.status(200).json(selectedPayment)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}
import OrderHasProduct from "../models/OrderHasProducts.js";
import Order from "../models/Orders.js";

OrderHasProduct.hasMany(Order, { foreignKey: "order_id" , constraints: false})

export const getOrderHasProducts = async (req, res) => {
    const orderhasproducts = await OrderHasProduct.findAll();
    res.status(200).json(orderhasproducts)
}

export const getOrderHasProduct = async (req, res) => {
    try {
        const orderId = req.params.id;
        const selectedOrderHasProduct = await OrderHasProduct.findAll({
            where: {
                id: orderId
            }
        });
        
        if (!selectedOrderHasProduct) throw new Error("OrderHasProducts not found!");
        res.status(200).json(selectedOrderHasProduct)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const addOrderHasProduct = async (req, res) => {

    try {
        let { userid, productid } = req.body;

        OrderHasProduct.sync().then((result) => {
            return OrderHasProduct.create({
                product_id: productid
            }).then(user => {
                return user.createOrder({
                    user_id: userid,
                    completed: false,
                })
            })
        })
        res.redirect('/');
    } catch (message) {
        res.redirect('/details');
        console.log("something went wrong!");
    }
}

export const deleteOrderHasProduct = async (req, res) => {
    try {
        const OrderHasProductId = req.params.id;
        const selectedOrder = await OrderHasProduct.destroy({
            where: {
                id: OrderHasProductId
            }
        });
        console.log("this is selected", selectedOrder);
        if (!selectedOrder) throw new Error("Category not found!");
        res.status(200).json(selectedOrder)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}
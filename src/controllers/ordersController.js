import Order from "../models/Orders.js";

export const getOrders = async (req, res) => {
    const orders = await Order.findAll();
    res.status(200).json(orders)
}

export const getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const selectedOrder = await Order.findAll({
            where: {
                id: orderId
            }
        });
        console.log("this is selected", selectedOrder);
        if (!selectedOrder) throw new Error("Order not found!");
        res.status(200).json(selectedOrder)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const editOrder = async (req, res) => {
    try {
        let { country, adress, zipcode, housenumber, product, user } = req.body
        console.log(product);
        console.log(product.length)
        if (product.length == 1) {
            Order.update({
                completed: true,
            }, {
                where: {
                    user_id: user,
                    completed: false
                },
                returning: true,
                plain: true,
            })
        } else {
            product.forEach(element => {
                Order.update({
                    completed: true,
                }, {
                    where: {
                        user_id: user,
                        completed: false
                    },
                    returning: true,
                    plain: true,
                })
            });
        }
        res.redirect("/profile");
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const userId = req.params.id;

        Order.sync().then((result) => {
            return Order.destroy({
                where: {
                    id: userId
                }
            })
        })
        res.redirect('/login');
    } catch (message) {
        res.redirect('/signup');
        console.log("something went wrong!");
    }
}
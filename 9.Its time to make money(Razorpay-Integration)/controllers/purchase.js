const Razorpay = require('razorpay');
const Order = require('../models/orders')
const userController = require('./user')

const purchasepremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.rzp_test_xYMc1rktA7IBD3,
            key_secret:  "9bT1i9DbdjGbp4LZFXuwHIeZ"
        });

        console.log('Razorpay API Key:', rzp.key_id); // Log API key for debugging

        const amount = 2500;

        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                console.error('Razorpay Order Creation Error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            req.user.createOrder({ orderid: order.id, status: 'PENDING' })
                .then(() => {
                    return res.status(201).json({ order, key_id: rzp.key_id });
                })
                .catch(err => {
                    console.error('User Order Creation Error:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                });
        });
    } catch (err) {
        console.error('Purchase Premium Error:', err);
        res.status(403).json({ message: 'Something went wrong', error: err.message });
    }
};


const updateTransactionStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } }); //2
        console.log("orderid>>>>", order_id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });
        const promise2 = req.user.update({ ispremiumuser: true });

        Promise.all([promise1, promise2]).then(() => {
            return res.status(202).json({
                success: true,
                message: "Transaction Successful",
                token: userController.generateAccessToken(userId,undefined , true)
                
            });
        }).catch((error) => {
            console.error("Error during Promise.all:", error);
            // return res.status(500).json({ message: "Something went wrong", error: error });
        });
    } catch (err) {
        console.error("Error in updateTransactionStatus:", err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};

module.exports = {
    purchasepremium,
    updateTransactionStatus
}
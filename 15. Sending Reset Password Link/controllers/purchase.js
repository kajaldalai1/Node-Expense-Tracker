const Razorpay = require('razorpay');
const Order = require('../models/orders');
require('dotenv').config();
const userController = require('./users');
//const RAZORPAY_KEY_ID='rzp_test_qRSPd4oxd2PeHL'
//const RAZORPAY_KEY_SECRET = 'EQGR0EwCQoF57LGqsX5Sv7z9'

const purchasepremium = async (req, res) => {
    try {
        console.log("controllers.purchasepremium 1")
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        console.log("controllers.purchasepremium 2")
        const amount = 2500;
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                return res.status(500).json({ message: 'Razorpay error', error: err });
            }
            req.user.createOrder({ orderid: order.id, status: "PENDING" }).then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id });
            }).catch(err => {
                return res.status(500).json({ message: 'Database error', error: err });
            });
        });
    } catch (err) {
        console.error("General error:", err);
        res.status(403).json({ message: 'Something went wrong', error: err });
    }
}


const updateTransactionStatus = async (req,res)=>{

    try{
        
        const {payment_id, order_id} = req.body;
        const order = await Order.findOne({where: {orderid: order_id}})
            const promise1 = order.update({paymentid: payment_id, status:'SUCCESSFUL'})
            const promise2 = req.user.update({ispremiumuser:true})
            Promise.all([promise1,promise2]).then(()=>{
                return res.status(202).json({sucess:true, message: "Transaction Successful", token: userController.generateAccessToken(req.user.id,undefined,true)})
            }).catch((error)=>{
                throw new Error(error)
            })
            
                
            
        
    }catch(err) {
        console.error("General error:", err);
        res.status(403).json({ message: 'Something went wrong', error: err });
    }
}



module.exports = {
    purchasepremium,
    updateTransactionStatus
}

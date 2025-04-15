const paymentService = require('../services/payment.service');

const createPaymentUrl = async (req, res) => {
    const { orderId } = req.body;
    const userId = req.user.id;

    const paymentUrl = await paymentService.createPaymentUrl(orderId, userId);

    res.status(200).json({
        paymentUrl
    });
};

const vnpayReturn = async (req, res) => {
    try {
        const result = await paymentService.handleReturn(req.query);

        if (result.success) {
            // Ví dụ: redirect về trang success
            return res.redirect(`/payment-success?orderId=${result.orderId}`);
        } else {
            return res.redirect(`/payment-fail`);
        }
    } catch (error) {
        console.log(error);
        return res.redirect(`/payment-fail`);
    }
};

const vnpayIpnHandler = async (req, res) => {
    try {
        const result = await paymentService.handleVnpIpn(req.query);

        return res.status(200).json(result);
    } catch (error) {
        console.error('VNPAY IPN Error:', error);
        return res.status(500).json({ RspCode: '99', Message: 'Internal Server Error' });
    }
};

module.exports = {
    createPaymentUrl, vnpayReturn, vnpayIpnHandler
};

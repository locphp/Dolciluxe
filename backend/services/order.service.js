const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Address = require('../models/address.model');

const createOrder = async (userId, { cartItemIds, addressId, paymentMethod }) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) throw new Error('Cart not found');

    if (!cartItemIds || cartItemIds.length === 0) throw new Error('No item selected');

    const selectedItems = cart.items.filter(item => cartItemIds.includes(item._id.toString()));
    if (selectedItems.length === 0) throw new Error('Selected items not found in cart');

    const orderItems = selectedItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
    }));

    const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const address = await Address.findById(addressId);
    if (!address) throw new Error('Address not found');

    const newOrder = await Order.create({
        user: userId,
        items: orderItems,
        address,
        paymentMethod,
        totalPrice,
        status: 'pending'
    });

    // Xoá item đã đặt khỏi cart
    cart.items = cart.items.filter(item => !cartItemIds.includes(item._id.toString()));
    await cart.save();

    return newOrder;
};
const getOrders = async (userId) => {
    const orders = await Order.find({ user: userId }).populate('items.product').populate('address');
    return { code: 200, message: 'Get orders successfully', data: orders };
};

const getOrderDetail = async (userId, orderId) => {
    const order = await Order.findOne({ _id: orderId, user: userId }).populate('items.product').populate('address');
    if (!order) throw new Error('Order not found');
    return { code: 200, message: 'Get order detail successfully', data: order };
};

const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.orderStatus = status;
    await order.save();

    return { code: 200, message: 'Order status updated successfully', data: order };
};

const deleteOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    await order.deleteOne();

    return { code: 200, message: 'Order deleted successfully' };
};

module.exports = {
    createOrder,
    getOrders,
    getOrderDetail,
    updateOrderStatus,
    deleteOrder
};

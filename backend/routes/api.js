const express = require('express');
const router = express.Router();

const productRouter = require('./product.router');
const productTypeRouter = require('./productType.router');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const addressRouter = require('./address.router');

// Route cho public access
router.use('/public/products', productRouter);  // Route: /api/public/products (danh sách, by-type,...)
router.use('/public/product', productRouter);   // Route: /api/public/product/:id (chi tiết theo id)

// Các route khác
router.use('/product-types', productTypeRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/address', addressRouter);

module.exports = router;

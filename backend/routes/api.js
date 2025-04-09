const express = require('express');
const router = express.Router();

const productRouter = require('./product.router');
const productTypeRouter = require('./productType.router');
const authRouter = require('./auth.router')
const userRouter = require('./user.router');
const addressRouter = require('./address.router');

router.use('/products', productRouter);
router.use('/product-types', productTypeRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/address', addressRouter);

module.exports = router;

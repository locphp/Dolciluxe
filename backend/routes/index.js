const express = require('express');
const router = express.Router();

const productRouter = require('./product.router');
const productTypeRouter = require('./productType.router');

router.use('/products', productRouter);
router.use('/product-types', productTypeRouter);

module.exports = router;

const Product = require('../models/product.model');
const ProductType = require('../models/producttype.model');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false })
            .populate({ path: 'productType', select: '_id typeName' });
        res.status(200).json({ code: 200, message: 'Success', data: products });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const getDeletedProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: true })
            .populate({ path: 'productType', select: '_id typeName' });
        res.status(200).json({ code: 200, message: 'Success', data: products });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({ path: 'productType', select: '_id typeName' });
        if (!product) return res.status(404).json({ code: 404, message: 'Product not found', data: null });

        res.status(200).json({ code: 200, message: 'Success', data: product });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const getProductsByType = async (req, res) => {
    try {
        const { typeId } = req.params;
        // Kiểm tra ProductType có tồn tại không
        const productTypeExists = await ProductType.findById(typeId);
        if (!productTypeExists) {
            return res.status(404).json({
                code: 404,
                message: "ProductType not found",
                data: null
            });
        }

        // Lấy danh sách sản phẩm theo productTypeId
        const products = await Product.find({ productTypeId: typeId, isDeleted: false })
            .populate({
                path: 'productTypeId',
                select: '_id typeName'
            });

        res.status(200).json({
            code: 200,
            message: "Success",
            data: products
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { productName, description, imageLink, productType, quantity, price, discount } = req.body;
        const productTypeExists = await ProductType.findById(productType);
        if (!productTypeExists) return res.status(404).json({ code: 404, message: 'ProductType not found' });

        const newProduct = new Product({ productName, description, imageLink, productType, quantity, price, discount });
        await newProduct.save();

        const populatedProduct = await Product.findById(newProduct._id)
            .populate({ path: 'productType', select: '_id typeName' });

        res.status(201).json({ code: 201, message: 'Product created successfully', data: populatedProduct });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Internal server error', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate({ path: 'productType', select: '_id typeName' });
        if (!updatedProduct) return res.status(404).json({ code: 404, message: 'Product not found', data: null });

        res.status(200).json({ code: 200, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const softDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date() }, { new: true });
        if (!product) return res.status(404).json({ code: 404, message: 'Product not found', data: null });

        res.status(200).json({ code: 200, message: 'Product moved to trash', data: product });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const restoreProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: false, deletedAt: null }, { new: true });
        if (!product) return res.status(404).json({ code: 404, message: 'Product not found', data: null });

        res.status(200).json({ code: 200, message: 'Product restored successfully', data: product });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const deleteProductPermanently = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ code: 404, message: 'Product not found', data: null });

        if (!product.isDeleted) {
            return res.status(400).json({ code: 400, message: 'Product must be soft deleted before permanent deletion', data: null });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ code: 200, message: 'Product permanently deleted', data: null });

    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

module.exports = {
    getAllProducts,
    getDeletedProducts,
    getProductById,
    getProductsByType,
    createProduct,
    updateProduct,
    softDeleteProduct,
    restoreProduct,
    deleteProductPermanently
};

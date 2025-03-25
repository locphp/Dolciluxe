const ProductType = require('../models/producttype.model');
const Product = require('../models/product.model');

const getAllProductTypes = async (req, res) => {
    try {
        const productTypes = await ProductType.find();
        res.status(200).json(productTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductTypeById = async (req, res) => {
    try {
        const productType = await ProductType.findById(req.params.id);
        if (!productType) return res.status(404).json({ message: 'Product type not found' });
        res.status(200).json(productType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProductType = async (req, res) => {
    try {
        const { typeName, description } = req.body;

        // Check for duplicate product type name
        const existingType = await ProductType.findOne({ typeName });
        if (existingType) return res.status(400).json({ message: 'Product type already exists' });

        const newProductType = new ProductType({ typeName, description });
        await newProductType.save();
        res.status(201).json(newProductType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProductType = async (req, res) => {
    try {
        const { typeName, description } = req.body;

        // Check if the product type exists
        const existingProductType = await ProductType.findById(req.params.id);
        if (!existingProductType) return res.status(404).json({ message: 'Product type not found' });

        // If updating typeName, check for duplicates
        if (typeName && typeName !== existingProductType.typeName) {
            const duplicateType = await ProductType.findOne({ typeName });
            if (duplicateType) return res.status(400).json({ message: 'Product type name already exists' });
        }

        // Only update fields that are provided
        existingProductType.typeName = typeName || existingProductType.typeName;
        existingProductType.description = description || existingProductType.description;

        await existingProductType.save();
        res.status(200).json(existingProductType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProductType = async (req, res) => {
    try {
        const productTypeId = req.params.id;

        const productExists = await Product.exists({ productType: productTypeId });

        if (productExists) {
            return res.status(400).json({ message: "Cannot delete! There are products linked to this type." });
        }

        await ProductType.findByIdAndDelete(productTypeId);
        res.status(200).json({ message: "Product type deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProductTypes,
    getProductTypeById,
    createProductType,
    updateProductType,
    deleteProductType
};

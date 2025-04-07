const userService = require('../services/user.service');

// Get all users (Only Admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsersService();
        res.status(200).json({
            code: 200,
            message: "Successfully fetched user list!",
            data: users
        });
    } catch (error) {
        console.error("Error fetching user list:", error);
        res.status(500).json({
            code: 500,
            message: "Server error!",
            data: error.message
        });
    }
};

// Get user information by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserByIdService(req.params.id);
        res.status(200).json({
            code: 200,
            message: "Successfully fetched user info!",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Server error!",
            data: error.message
        });
    }
};

// Update user information (User or Admin)
exports.updateUser = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const updatedUser = await userService.updateUserService(req.params.id, { name, phone, address });
        res.status(200).json({
            code: 200,
            message: "User updated successfully!",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Server error!",
            data: error.message
        });
    }
};

// Soft delete user (Only Admin)
exports.softDeleteUser = async (req, res) => {
    try {
        const user = await userService.softDeleteUserService(req.params.id);
        res.status(200).json({
            code: 200,
            message: "User soft deleted!",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Server error!",
            data: error.message
        });
    }
};

// Restore soft deleted user (Only Admin)
exports.restoreUser = async (req, res) => {
    try {
        const user = await userService.restoreUserService(req.params.id);
        res.status(200).json({
            code: 200,
            message: "User restored successfully!",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Server error!",
            data: error.message
        });
    }
};

// Permanently delete user (Only Admin)
exports.deleteUserPermanently = async (req, res) => {
    try {
        await userService.deleteUserPermanentlyService(req.params.id);
        res.status(200).json({
            code: 200,
            message: "User permanently deleted!",
            data: null
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Server error!",
            data: error.message
        });
    }
};

exports.updatePasswordById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { password } = req.body;

        // So sánh id trong token với id trên params
        if (req.user.id !== userId) {
            return res.status(403).json(
                {
                    code: 403,
                    message: "Forbidden: You can only update your own password."
                });
        }

        await userService.updatePasswordByIdService(userId, password);

        res.status(200).json(
            {
                code: 200,
                message: "Password updated successfully."

            }
        );
    } catch (error) {
        next(error);
    }
};

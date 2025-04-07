const User = require('../models/user.model');

exports.getAllUsersService = async () => {
    try {
        const users = await User.find({ isDeleted: false }).select('-password');
        return users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone || null,
            address: {
                street: user.address?.street || null,
                city: user.address?.city || null,
                country: user.address?.country || null,
            },
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
    } catch (error) {
        throw new Error('Error fetching user list: ' + error.message);
    }
};

exports.getUserByIdService = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (!user || user.isDeleted) {
            throw new Error("User not found!");
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching user info: ' + error.message);
    }
};

exports.updateUserService = async (userId, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { ...updateData, updatedAt: Date.now() },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            throw new Error("User not found!");
        }

        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user info: ' + error.message);
    }
};

exports.softDeleteUserService = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { isDeleted: true, deletedAt: Date.now() }, { new: true });
        if (!user) {
            throw new Error("User not found!");
        }

        return user;
    } catch (error) {
        throw new Error('Error performing soft delete: ' + error.message);
    }
};

exports.restoreUserService = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { isDeleted: false, deletedAt: null }, { new: true });
        if (!user) {
            throw new Error("User not found!");
        }

        return user;
    } catch (error) {
        throw new Error('Error restoring user: ' + error.message);
    }
};

exports.deleteUserPermanentlyService = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("User not found!");
        }

        return true;
    } catch (error) {
        throw new Error('Error permanently deleting user: ' + error.message);
    }
};

exports.updatePasswordByIdService = async (userId, newPassword) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();
};
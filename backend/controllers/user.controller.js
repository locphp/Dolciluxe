const User = require('../models/user.model');

// Lấy danh sách tất cả người dùng (Chỉ Admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false }).select('-password');  // Ẩn password
        res.status(200).json({ message: "Lấy danh sách user thành công!", users });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

// Lấy thông tin user theo ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user || user.isDeleted) {
            return res.status(404).json({ message: "User không tồn tại!" });
        }
        res.status(200).json({ message: "Lấy thông tin user thành công!", user });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

// Cập nhật thông tin người dùng (User hoặc Admin)
exports.updateUser = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, phone, address, updatedAt: Date.now() },
            { new: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: "User không tồn tại!" });
        res.status(200).json({ message: "Cập nhật user thành công!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

// Xóa mềm user (Chỉ Admin)
exports.softDeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: Date.now() }, { new: true });
        if (!user) return res.status(404).json({ message: "User không tồn tại!" });

        res.status(200).json({ message: "Đã xóa user (soft delete)!", user });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

// Khôi phục user đã bị xóa mềm (Chỉ Admin)
exports.restoreUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: false, deletedAt: null }, { new: true });
        if (!user) return res.status(404).json({ message: "User không tồn tại!" });

        res.status(200).json({ message: "User đã được khôi phục!", user });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

// Xóa vĩnh viễn user (Chỉ Admin)
exports.deleteUserPermanently = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User không tồn tại!" });

        res.status(200).json({ message: "User đã bị xóa vĩnh viễn!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');
const { getAllUsers, getUserById, updateUser, softDeleteUser, restoreUser, deleteUserPermanently, updatePasswordById } = require('../controllers/user.controller');

const router = express.Router();

router.get('/', verifyAdmin, getAllUsers);  // Chỉ Admin được xem danh sách users
router.get('/:id', verifyToken, getUserById);  // User nào cũng xem profile của họ được
router.put('/:id', verifyToken, updateUser); // Cập nhật user
router.delete('/:id', verifyAdmin, softDeleteUser);  // Admin xóa mềm user
router.patch('/restore/:id', verifyAdmin, restoreUser);  // Admin khôi phục user
router.delete('/permanent/:id', verifyAdmin, deleteUserPermanently);  // Admin xóa vĩnh viễn user
router.put('/update-password/:id', verifyToken, updatePasswordById);

module.exports = router;

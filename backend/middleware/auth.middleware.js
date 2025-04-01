const jwt = require('jsonwebtoken');

// Middleware xác thực token
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Bạn chưa đăng nhập!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token không hợp lệ!" });
        req.user = user;
        next();
    });
};

// Middleware kiểm tra quyền Admin
exports.verifyAdmin = (req, res, next) => {
    exports.verifyToken(req, res, (err) => {
        if (err) return res.status(403).json({ message: "Token không hợp lệ!" });

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
        }
        next();
    });
};

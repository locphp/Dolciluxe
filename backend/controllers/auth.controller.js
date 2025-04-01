const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new account
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, address, isAdmin } = req.body;

        // Check if email already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ code: 400, message: "Email is already in use!" });

        // Create new user (không mã hóa mật khẩu ở đây)
        user = new User({
            name,
            email,
            password, // Mật khẩu sẽ được mã hóa tự động trong middleware `pre('save')`
            phone,
            address,
            isAdmin: isAdmin || false, // Default to false if not provided
        });

        await user.save();

        // Generate access token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Set token in cookies
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(201).json({
            code: 201,
            message: "Registration successful!",
            token,
            user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ code: 500, message: "Server error", error });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra user có tồn tại không
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ code: 400, message: "Account does not exist!" });

        // So sánh mật khẩu đã mã hóa
        const isMatch = await user.comparePassword(password);
        // if (!isMatch) return res.status(400).json({ code: 400, message: "Invalid password!" });
        if (!isMatch) {
            console.error("Password mismatch:", { enteredPassword: password, storedPassword: user.password });
            return res.status(400).json({ code: 400, message: "Invalid password!" });
        }

        // Tạo access token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Lưu token vào cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            code: 200,
            message: "Login successful!",
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ code: 500, message: "Server error", error: error.message });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).json({ code: 200, message: "Logout successful!" });
};

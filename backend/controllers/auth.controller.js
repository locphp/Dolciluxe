const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const response = await authService.registerUser(name, email, password, phone, address);
        res.status(response.code).json(response);
    } catch (error) {
        res.status(500).json({ code: 500, message: "Server error", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await authService.loginUser(email, password);
        res.status(response.code).json(response);
    } catch (error) {
        res.status(500).json({ code: 500, message: "Server error", error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const response = await authService.logoutUser();
        res.status(response.code).json(response);
    } catch (error) {
        res.status(500).json({ code: 500, message: "Server error", error: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const response = await authService.refreshToken(refreshToken);
        res.status(response.code).json(response);
    } catch (error) {
        res.status(500).json({ code: 500, message: "Server error", error: error.message });
    }
};

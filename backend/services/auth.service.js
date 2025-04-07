const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '45m' }
    );
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

exports.registerUser = async (name, email, password, phone, address) => {
    try {
        const userExist = await User.findOne({ email });
        if (userExist) return { code: 400, message: "Account already exists!" };

        const newUser = new User({
            name,
            email,
            password,
            phone,
            address,
        });

        await newUser.save();

        return { code: 200, message: "Register successful!" };
    } catch (error) {
        throw new Error("Server error");
    }
};

exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { code: 400, message: "Email does not exist!" };
        }

        if (user.isDeleted) {
            return { code: 400, message: "Account has been deleted!" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { code: 400, message: "Invalid password!" };
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return {
            code: 200,
            message: "Login successfully!",
            accessToken,
            refreshToken,
        };
    } catch (error) {
        console.error(error);
        return { code: 500, message: "Internal server error!" };
    }
};


exports.logoutUser = async () => {
    try {
        return { code: 200, message: "Logout successful!" };
    } catch (error) {
        throw new Error("Server error");
    }
};

exports.refreshToken = async (refreshToken) => {
    try {
        if (!refreshToken) return { code: 401, message: "Refresh Token is required!" };

        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
                if (err) {
                    return resolve({ code: 403, message: "Invalid Refresh Token!" });
                }

                const newAccessToken = generateAccessToken(user);
                resolve({
                    code: 200,
                    message: "New access token generated successfully!",
                    accessToken: newAccessToken,
                });
            });
        });
    } catch (error) {
        throw new Error("Server error");
    }
};

exports.loginWithGoogle = async (profile) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                avatar: profile.photos[0].value,
            });
        }

        return {
            code: 200,
            message: 'Login with Google successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin
            }
        };
    } catch (error) {
        return { code: 500, message: 'Internal server error', error: error.message };
    }
};
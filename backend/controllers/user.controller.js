const User = require('../models/user.model');
const bcrypt = require("bcryptjs");

const formatUserResponse = (user) => ({
    id: user._id,
    googleID: user.googleID,
    profilePicture: user.profilePicture,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
    roleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

const getListUser = async(req, res) => {
    try {  
        const users = await User.find({}, {password:0}); //khong tra ve password
        res.json(users.map(formatUserResponse));
        res.status(200).json({ code: 200, message: 'Success', data: users });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({code: 404 ,message: 'User not found', data: null});
        res.json(formatUserResponse(user));
        res.status(200).json({ code: 200, message: 'Success', data: users });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(res.params.id);
        if(!user) return res.status(404).json({code: 404 ,message: 'User not found', data: null});
        res.status(200).json({ code: 200, message: 'User deleted successfully', data: user });
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const updateUser = async(req,res) =>{
    try {
        const {name, phone, address} = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, phone, address, updatedAt: new Date() },
            { new: true }
        ).select('-password');
        if(!user) return res.status(404).json({code: 404 ,message: 'User not found', data: null});
        res.json(formatUserResponse(user));
    } catch (error) {
        res.status(500).json({ code: 500, message: error.message, data: null });
    }
};

const createUser = async(req, res) => {
    try {
        const { googleID, name, email, password, profilePicture } = req.body;

        if (!name || !email || (!password && !googleID)) {
          return res.status(400).json({ error: "Missing required fields" });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: "Email already exists" });
        }
    
        let hashedPassword = null;
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
        }
    
        const newUser = new User({
          googleID: googleID || null,
          name,
          email,
          password: hashedPassword,
          phone: null,
          address: {},
          profilePicture: profilePicture || null,
          createdAt: new Date(),
          updatedAt: null,
          isAdmin: false,
        });
    
        await newUser.save();
        res.status(201).json(formatUserResponse(newUser));
        } catch (error) {
            res.status(500).json({ code: 500, message: error.message, data: null });
        }
};

const getUserByEmail = async(req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).select("-password");
    
        if (!user) {
          console.log(`No user found with email: ${email}`);
          return res.status(404).json({ error: "User not found" });
        }
    
        console.log(`User found: ${user.name}, Is Admin? ${user.isAdmin}`);
        res.json(formatUserResponse(user));
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports= {
    getListUser,
    getUserById,
    getUserByEmail,
    updateUser,
    createUser,
    deleteUser
};
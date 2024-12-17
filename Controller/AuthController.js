const User = require("../Models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const user = await User.create({ email, password, username, createdAt });
        const token = await createSecretToken(user._id);
        if (token) {
            res.cookie("token", token, {
                withCredentials: true,
            });

            res

                .status(201)
                .json({ message: "User signed in successfully", success: true, user, token });
            next();
        }
        else {
            res.status(500).json({ message: "Internal Server Error" })
        }

    } catch (error) {
        console.error(error);
    }
};
module.exports.Login = async (req, res) => {
    try {


        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await createSecretToken(user._id);
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }

        if (token) {
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });

            res

                .status(201)
                .json({ message: "User Login  in successfully", success: true, user, token });

        }
        else {
            res.status(500).json({ message: "Internal Server Error" })
        }

        res.status(200).json({ message: "Login successful", success: true, user, token });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
try {
    res.status(200).json({ message: "Hello from the server side!"});
} catch (error) {
    console.log(error);
}
};

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email: email});
        if (userExist){
            return res.status(400).json({ message: "User already exists"});
        }

        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

            const user = await User.create({
              username,
              email,
              phone,
              password: hash_password,
            });

            res.status(201).json({
              msg: "user created successfully",
              token: await user.generateToken(),
              userId: user._id.toString(),
            });

    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({email});
        if (!userExist){
            return res.status(400).json({ message: "User does not exist"});
        }

        const user = await userExist.comparePassword(password);

        if (user) {
          res.status(200).json({
            msg: "login successfully",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
          });
        } else {
          return res.status(401).json({ message: "Invallid credentials" });
        }

    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
};

module.exports = { home, register, login };
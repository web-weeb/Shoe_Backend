const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});


// compare password

userSchema.methods.comparePassword = async function(password){
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        console.error(error);
    }
}

// json web token

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin: this.isAdmin,
        },

       process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
        );
    } catch (error) {
        console.error(error);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
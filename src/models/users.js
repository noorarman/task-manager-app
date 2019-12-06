const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Must be a valid email");
            }
        }
    },
    password: {
        required: true,
        type: String,
        trim: true,
        minlength: 6,
        validate(value) {
            let password = value.toLowerCase();
            if (password === "password") {
                throw new Error(`password must not be 'password'`);
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number!");
            }
        }
    }
});
userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.find({
            email
        });
        if (!user) {
            throw new Error("Unable to login");
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Unable to login");
        }
        return user;
    } catch (error) {
        return error
    }


};

userSchema.pre("save", async function (next) {
    let user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
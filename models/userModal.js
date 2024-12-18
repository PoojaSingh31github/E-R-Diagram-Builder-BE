import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String || Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true
    }
}, { timestamps: true });
const userModal = mongoose.model("userSchema", userSchema)
export default userModal
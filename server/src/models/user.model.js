import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }

}, { timestamps: true });

const user = mongoose.model("user", userSchema);
export default user;
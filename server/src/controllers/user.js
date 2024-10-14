import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAccount = async (req, res) => {

    const { fullName, email, password } = req.body;

    // Check if there are any empty fields
    if (!fullName || !email || !password) 
        return res.status(400).json({ err: true, msg: "All fields are required "});
    

    // Check if the user already has an account
    const isUser = await User.findOne({ email });
    if (isUser) 
        return res.status(400).json({ err: true, msg: "User already exists "});
    

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });

    await user.save();

    const accessToken = jwt.sign({ 
        userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h", 
        }
    );

    return res.status(201).json({ 
        err: false,
        user: { fullName: user.fullName, email: user.email },
        accessToken,
        msg: "New Account Created"
    });

}

export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) 
        return res.status(400).json({ err: true, msg: "Email and password required" });
    
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).json({ err: true, msg: "Invalid Credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
        return res.status(400).json({ msg: "Invalid Credentials" });

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.json({
        err: false,
        msg: "Login Successful",
        user: { fullName: user.fullName, email: user.email },
        accessToken
    });

}

export const getUser = async (req, res) => {



}
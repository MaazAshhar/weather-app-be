import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

export const signUp = async (req, res) => {
    try {
        const {user} = req.body;
        const salt = 10;
        user['password'] = await bcrypt.hash(user.password, salt);
        const newUser = await User.create(user);
        res.status(201).send({success: true});
    } catch (error) {
        res.status(500).send({success: false, description: 'Internal server error', error: 'Server error, please try again later'});
    }
}

export const login = async (req, res) => {
    try {
        const {user} = req.body;
        const salt = 10;
        const myUser = await User.findOne({email: user.email});
        if (myUser && await bcrypt.compare(user.password, myUser.password)) {
            const payload = {
                id: myUser._id,
                name: myUser.name,
                email: myUser.email
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            return res.status(200).send({success: true, status: 'Login successful', token: token});
        }
        return res.status(401).send({success: false, error: 'Wrong email/password'});
    } catch (error) {
        res.status(500).send({success: false, description: 'Internal server error', error: 'Server error, please try again later'});
    }
}
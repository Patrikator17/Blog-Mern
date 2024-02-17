import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorHandle.js";

export const signup = async(req, res, next) => {

    console.log(req.body);

    const {
        username,
        email,
        password
    } = req.body;

    if (!username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === '') {
            return next(errorHandler(400, 'All fields are required')); // To prevent the user from being added to the database 
            //when there's an error, you should return from the function immediately after sending the error response.
    }

    // After getting password use bcryptjs
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup Successful...');
    } catch(error) {
        next(error);
    }
};

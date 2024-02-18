import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorHandle.js";
import jwt from "jsonwebtoken";

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


export const login = async(req, res, next) => {
    const {
        email,
        password
    } = req.body;

    if (!email ||
        !password ||
        email === '' ||
        password === ''){
            return next(errorHandler(400, 'All fields are required'));
    }

    try{
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(404, 'User not found..'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, 'Incorrect Credentials...'))
        }
        // Authenticate user
        const token = jwt.sign(
            {id: validUser._id}, process.env.JWT_SECRET_KEY, 
        )
        //Separate password for display
        const {password: pass, ...rest} = validUser._doc;
        

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)
    }catch(error){
        next(error)
    }
}
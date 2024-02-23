import User from "../model/user.model.js";
import { errorHandler } from "../utils/errorHandle.js"
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({message: 'Test API!!!'})
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    
    try {

        const {username, email, password, profilePicture} = req.body
        let hashedPassword;

        if(password){
            hashedPassword = bcryptjs.hashSync(password, 10);
        }

        const updatedFields = {
            username,
            email,
            ...(hashedPassword && {password: hashedPassword}),
            profilePicture
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {$set: updatedFields},
            {new: true} 
        );

        const {password: _, ...rest } = updatedUser._doc
      
        res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  
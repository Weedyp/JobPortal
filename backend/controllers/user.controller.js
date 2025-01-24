import { User } from "../models/user.model"
import bcrypt from "bcrypt.js"
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role,
        });
        return res.status(201).json({
            message: "User created successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            })
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        };

        //check role is correct or not
        if (role != user.role) {
            return res.status(400).json({
                message: "Account dosnt exist with current role",
                success: false
            })
        };

        //generate token
        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            success: true
        })
    }
    catch {
        console.log(error);
    }
}

export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logged out successfully",
            success: true
        })
    }catch(error){
        console.log(error)
    }
}
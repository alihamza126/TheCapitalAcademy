import express from 'express'
import { asyncWrapper } from '../helpers/asyncWrapper.js';
import UserModel from '../models/User.js';
import bcrypt from "bcryptjs";
import { registerSchema } from '../validators/users.validation.js';
import { sendEmail } from '../helpers/mailer.js';
import { authUser } from '../middleware/auth.middleware.js';

const userRouter = express.Router();




userRouter.post("/register", asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(err => err.message);
        return res.status(400).json({ error: errorMessages, success: false });
    }

    //check if user already exists
    const user = await UserModel.findOne({ email })
    if (user) {
        return res.status(409).json({ error: "User already exists", success: false });
    }

    const userByUsername = await UserModel.findOne({
        username: { $regex: `^${username}$`, $options: 'i' }, // email case-insensitive
    });

    if (userByUsername) {
        return res.status(400).json({ error: "Username already exists", success: false });
    }


    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser);

    //send verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

    return res.json({
        message: "User created successfully",
        success: true,
        savedUser
    })
}));

userRouter.post("/verifyemail", asyncWrapper(async (req, res) => {
    const { token } = req.body;
    console.log(token);

    const user = await UserModel.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
    console.log(user);
    if (!user) {
        return res.status(400).json({ error: "Invalid token", success: false });
    }

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.json({
        message: "Email verified successfully",
        success: true
    })
}));

//forgot password
userRouter.post("/forgotpassword", asyncWrapper(async (req, res) => {
    const { email } = req.body;
    console.log(email);

    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
        return res.status(400).json({ error: "Invalid email", success: false });
    }

    await user.save();
    await sendEmail({ email, emailType: "RESET", userId: user._id, username: user.username });

    return res.status(200).json({
        message: "Rest email sent to your email",
        success: true
    })
}));

userRouter.post('/verify-reset-token', asyncWrapper(async (req, res) => {
    const { token } = req.body
    if (!token) {
        return res.status(400).json({ error: 'Token is required', success: false })
    }

    const user = await UserModel.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
        return res
            .status(400)
            .json({ error: 'Invalid or expired token', success: false })
    }

    res.status(200).json({ message: 'Token is valid', success: true })
}));

userRouter.post('/resetpassword', asyncWrapper(async (req, res) => {
    const { token, password } = req.body
    if (!token || !password) {
        return res.status(400).json({
            error: 'Token and new password are required',
            success: false
        })
    }

    const user = await UserModel.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
        return res
            .status(400)
            .json({ error: 'Invalid or expired token', success: false })
    }

    // hash & save
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined
    user.updatedAt = Date.now()
    await user.save()

    res.status(200).json({
        message: 'Password has been reset! You can now log in.',
        success: true
    })
})
)

// authenticateUser,
userRouter.patch('/update', authUser, asyncWrapper(async (req, res) => {
    const id = req.user.id;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ updatedUser, success: true });
}));


// ---------get user profile  ----- 

userRouter.get('/me/:id', asyncWrapper(async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findById(id)
    res.status(200).json({ user, success: true });
}));


userRouter.get("/me", authUser, asyncWrapper(async (req, res) => {
    try {
        const id = req.user.userId;

        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" })
        }

        const user = await UserModel.findById(id).select("-password -forgotPasswordToken -verifyToken")

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.json({ user })
    } catch (error) {
        console.error("Get user error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}));

userRouter.put("/me",authUser, async (req, res) => {
    try {
        const id = req.user.userId;
        const { image, firstName, lastName, phone, gender, dob, city, aggPercentage, username } = req.body

        // Validate ObjectId
        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" })
        }

        // Prepare update object
        const updateData = {
            updatedAt: new Date(),
        }

        // Only include fields that are provided
        if (image !== undefined) updateData.image = image
        if (firstName !== undefined) updateData.firstName = firstName
        if (lastName !== undefined) updateData.lastName = lastName
        if (phone !== undefined) updateData.phone = phone
        if (gender !== undefined) updateData.gender = gender
        if (dob !== undefined) updateData.dob = new Date(dob)
        if (city !== undefined) updateData.city = city
        if (aggPercentage !== undefined) updateData.aggPercentage = Number(aggPercentage)
        if (username !== undefined) {
            updateData.username = username
            updateData.usernameChangeAt = new Date()
        }

        // Validate gender if provided
        if (gender && !["male", "female"].includes(gender)) {
            return res.status(400).json({ error: "Gender must be either male or female" })
        }

        // Validate aggPercentage if provided
        if (aggPercentage !== undefined && (aggPercentage < 0 || aggPercentage > 100)) {
            return res.status(400).json({ error: "Aggregate percentage must be between 0 and 100" })
        }

        // Check if username is unique (if being updated)
        if (username) {
            const existingUser = await UserModel.findOne({
                username,
                _id: { $ne: id },
            })
            if (existingUser) {
                return res.status(409).json({ error: "Username already exists" })
            }
        }

        // Update user
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
            select: "-password -forgotPasswordToken -verifyToken",
        })

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" })
        }

        res.json({
            message: "User updated successfully",
            user: updatedUser,
        })
    } catch (error) {
        console.error("Update user error:", error)

        if (error.code === 11000) {
            return res.status(409).json({ error: "Username already exists" })
        }

        res.status(500).json({ error: "Internal server error" })
    }
})




export default userRouter;

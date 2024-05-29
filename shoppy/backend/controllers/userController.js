import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js '

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username, !email, !password) {
        throw new Error('Please fill all the inputs')
    }

    const userExists = await User.findOne({email})

    if(userExists) res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const existingUser = new User({username, email, password : hashPassword})

    try {
        await existingUser.save()

        createToken(res, existingUser._id);

        res.status(201).json({
            _id : existingUser._id,
            username : existingUser.username,
            email : existingUser.email,
            isAdmin : existingUser.isAdmin
        })


    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({ email })

    if(existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if(isPasswordValid) {
            createToken(res, existingUser._id)

            res.status(201).json({
                _id : existingUser._id,
                username : existingUser.username,
                email : existingUser.email,
                isAdmin : existingUser.isAdmin
            })
            return // Exit the function after sending response
        }
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({message: "Logged out successfully"})
})

const getAllUsesrs = asyncHandler(async (req, res) => {
    const user = await User.find({})
    res.json(user)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        res.json({
            _id : user._id,
            username : user.username,
            email : user.email
        })        
    }
    else {
        res.status(404)
        throw new Error("User not found!")
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashPassword
        }

        user.save()

        res.json({
            _id : user._id,
            username : user.username,
            email : user.email,
            isAdmin : user.isAdmin
        })      

    } else {
        res.status(404)
        throw new Error("User not found!")
    }
})

const deleteUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id) // grab from '/:id'

    if (user) {
        if(user.isAdmin) {
            res.status(400)
            throw new Error("cannot delete admin user")
        } else {
            await User.deleteOne({_id : user._id})
            res.json({message : "User removed"})
        }
    } else {
        res.status(404)
        throw new Error("User not found!")
    }

})

const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password') //get all user data except password

    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User not found!")
    }
})

const updateUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashPassword
        }

        await user.save()

        res.json({
            _id : user._id,
            username : user.username,
            email : user.email,
            isAdmin : user.isAdmin
        })

    } else {
        res.status(404)
        throw new Error("User not found!")
    }
})

export {
    createUser, 
    loginUser, 
    logoutUser, 
    getAllUsesrs, 
    getCurrentUserProfile, 
    updateCurrentUserProfile, 
    deleteUserById, 
    getUserById,
    updateUserById
}
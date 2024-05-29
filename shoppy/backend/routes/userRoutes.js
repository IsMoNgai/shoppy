import express from "express"
import {
    createUser, 
    loginUser, 
    logoutUser, 
    getAllUsesrs, 
    getCurrentUserProfile, 
    updateCurrentUserProfile, 
    deleteUserById,
    getUserById,
    updateUserById
} from '../controllers/userController.js'
import { authenticate, authorizeAdmin, } from "../middlewares/authMiddleware.js"

const router = express.Router()

// routes can handle different kind of signal by .get or .post etc

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsesrs)
router.post('/auth', loginUser)
router.post('/logout', logoutUser)
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

// Admin Routes

router.route("/:id").delete(authenticate, authorizeAdmin, deleteUserById).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateUserById)

export default router
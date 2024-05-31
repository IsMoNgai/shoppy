import express from 'express'
import {authenticate, authorizeAdmin} from '../middlewares/authMiddleware.js'
import { 
    createCategory,
    updateCategory, 
    deleteCategory,
    listCategory,
    readCategory,
} from '../controllers/categoryController.js'

const router = express.Router()

router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route('/:categoryId').put(authenticate, authorizeAdmin, updateCategory) 
router.route('/:categoryId').delete(authenticate, authorizeAdmin, deleteCategory)
router.route('/categories').get(listCategory)
router.route('/:id').get(readCategory)

export default router;     
import express from 'express'
import formidable from 'express-formidable'
import {authenticate, authorizeAdmin} from '../middlewares/authMiddleware.js'
import checkId from '../middlewares/checkid.js'
import { 
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProduct,
    fetchProductById,
    fetchAllProduct,
    addProductReview,
} from '../controllers/productController.js'

const router = express.Router()

//since it is a form data so we need to specify formidable
/*
In Express.js, routes are matched in the order they are defined.
If you define a more specific route after a less specific route, 
the less specific route might catch the request before it gets to the more specific one.
Ex: allproduct is after / but before :id
*/
router.route('/').get(fetchProduct).post(authenticate, authorizeAdmin, formidable(), addProduct)
router.route('/allproducts').get(fetchAllProduct)
router.route('/:id/reviews').post(authenticate, authorizeAdmin, addProductReview)
router.route('/:id').get(fetchProductById).put(authenticate, authorizeAdmin, formidable(), updateProduct).delete(authenticate, authorizeAdmin, deleteProduct)
export default router;     
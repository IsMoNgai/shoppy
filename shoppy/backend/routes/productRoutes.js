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
    fetchTopProduct,
    fetchNewProduct,
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
router.route('/top').get(fetchTopProduct)
router.route('/new').get(fetchNewProduct)
router.route('/:id/reviews').post(authenticate, authorizeAdmin, checkId, addProductReview)
router.route('/:id').put(authenticate, authorizeAdmin, formidable(), updateProduct).get(fetchProductById).delete(authenticate, authorizeAdmin, deleteProduct)
export default router;     
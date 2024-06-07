import asyncHandler from "../middlewares/asyncHandler.js"
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const {name, description,image,  price, category, quantity, brand} = req.fields

        // Validation
        switch(true) { 
            case !name:
                return res.json({error: "Name is required"})
            case !description:
                return res.json({error: "Description is required"})
            case !price:
                return res.json({error: "Price is required"})
            case !category:
                return res.json({error: "Category is required"})
            case !quantity:
                return res.json({error: "Quantity is required"})
            case !brand:
                return res.json({error: "Brand is required"})
            default:
                break
        }

        const product = new Product({...req.fields})
        await product.save()
        res.json(product)

    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})

const updateProduct = asyncHandler(async (req, res)=> {
    try {
        const {image, name, description,  price, category, quantity, brand} = req.fields
        
        //Validation
        switch(true) {  
            case !name:
                return res.json({error: "Name is required"})
            case !description:
                return res.json({error: "Description is required"})
            case !price:
                return res.json({error: "Price is required"})
            case !category:
                return res.json({error: "Category is required"})
            case !quantity:
                return res.json({error: "Quantity is required"})
            case !brand:
                return res.json({error: "Brand is required"})
            default:
                break
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true})
        
        await product.save() 

        res.json(product)

    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})

const deleteProduct = asyncHandler(async (req, res)=> {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        res.json(product)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})

const fetchProduct = asyncHandler(async (req, res)=> {
    try {
        const pageSize = 6
        const keyword = req.query.keyword ? {name : {$regex: req.query.keyword, $options: 'i',}} : {}

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize)

        res.json({products, page: 1, pages: Math.ceil(count/pageSize), hasMore: false}) 

        res.json(products)
    } catch (error) {
        console.error(error) 
        res.status(400).json(error.message)
    }
})

const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(product) {
            return res.json(product) 
        } else {
            res.status(404)
            throw new Error("Product not found ")
        }
    } catch (error) {
        console.error(error) 
        res.status(404).json({error : "Product not found"})
    }
})

const fetchAllProduct = asyncHandler(async (req, res)=> {
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({createAt : -1})

        res.json(products)
    } catch (error) {
        console.error(error) 
        res.status(500).json({error : "Server Error"})
    }
})

const addProductReview = asyncHandler(async (req, res)=> {
    try {
        const {rating, comment} = req.body

        const product = await Product.findById(req.params.id)

        if(isNaN(rating)) {
            res.status(400)
            throw new Error("Rating  must be a number")
        }

        if(!comment) {
            res.status(400)
            throw new Error("Comment is required")
        }

        if(product) {
            const alreadyReviewed = product.review.find(r => r.user.toString() === req.user._id.toString())

            if(alreadyReviewed) {
                res.status(400)
                res.json("Product already reviewed")
            }

            const review = {
                name : req.user.username,
                rating: Number(rating),
                review: comment,
                user : req.user._id
            }

            product.review.push(review)
            product.numReviews = product.review.length

            product.rating = Number(product.review.reduce((acc, item) => item.rating + acc , 0) / product.review.length)

            await product.save()
            res.status(201).json({message: "Review added"})

        } else {
            res.status(404)
            throw new Error("Product not found")
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Server Error")
    }
})

const fetchTopProduct = asyncHandler(async (req, res)=> {
    try {
        // use reduce to loop through whole list and find only return the first item that satisfy
        // const product = await Product.find({})
        // const topProduct = product.reduce((top, item) => (item.rating > top.rating ? top = item : top = top), product[0])

        // rating first if rating is the same then will compare name
        const products = await Product.find({}).limit(12).sort({ rating: -1, name: 1 });

        res.status(201).json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json("Server Error")
    }
})

const fetchNewProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt descending
            .limit(12); // Limit to 12 products

        res.json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json("Server Error")
    }
})

export {
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProduct,
    fetchProductById,
    fetchAllProduct,
    addProductReview,
    fetchTopProduct,
    fetchNewProduct,
} 
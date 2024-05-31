 import Category from "../models/categoryModel.js";
 import asyncHandler from "../middlewares/asyncHandler.js";

 const createCategory = asyncHandler(async(req, res) => {
    try {
        const {name} = req.body
        
        if(!name) {
            return res.json({error: "name is required"});
        }

        const existingCategory = await Category.findOne({name})

        if(existingCategory) {
            return res.json({error: "already exists"})
        } 

        const newCategory = await new Category({name}).save()
        res.json(newCategory)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
 }) 

const updateCategory = asyncHandler(async(req, res) => {
    try {
        
        const {name} = req.body;
        const {categoryId} = req.params

        const category = await Category.findOne({_id : categoryId})

        if(!category) {
            return res.status(404).json({error: "category not found"})
        }

        category.name = name

        const updatedCategory = await category.save()

        res.json(updatedCategory)

    } catch (error) { 
        console.log(error)
        return res.status(500).json({error: "internal server error"})
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    // const {name} = req.body //from the req body we only extract name portion
    // const {categoryId} = req.params

    // const existingCategory = await Category.findOne({_id : categoryId})

    // if(!existingCategory) {
    //     return res.status(404).json({error: "category not found"})
    // }

    // const deletedCategory = await Category.deleteOne({_id : categoryId})

    // res.json({message : "category removed"})

    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId)
        res.json(removed)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const listCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find({})
        res.json(category) 
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const readCategory = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params //specify which part of params you want if u do :/id put id here etc
        const category = await Category.findOne({_id : id})
        res.json(category)   
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

 export {
    createCategory,
    updateCategory,
    deleteCategory,
    listCategory,
    readCategory,
 }
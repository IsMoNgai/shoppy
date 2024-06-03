import { apiSlice } from "./apiSlice"
import { CATEGORY_URL, USERS_URL } from "../constants"
import { deleteCategory, listCategory, readCategory, updateCategory } from "../../../../backend/controllers/categoryController"
import Category from "../../pages/Admin/Category"

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createCategory : builder.mutation({
            query : (data) => ({
                url : `${CATEGORY_URL}`,
                method : "POST",
                body: data,
            }),
        }),
        updateCategory : builder.mutation({
            query : ({categoryId, data}) => ({
                url : `${CATEGORY_URL}/${categoryId}`,
                method : "PUT",
                body : data,
            })
        }),
        deleteCategory : builder.mutation({
            query : (categoryId) => ({
                url : `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE",
            })
        }),
        listCategory : builder.query({
            query : () => ({
                url : `${CATEGORY_URL}/categories`,
            }),
        }),
    }),
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useListCategoryQuery,
} = categoryApiSlice
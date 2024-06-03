import { useEffect, useState } from "react"
import { collapseToast, toast } from "react-toastify"
import { 
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useListCategoryQuery,
 } from "../../redux/api/categoryApiSlice"
import CategoryForm from "../../components/CategoryForm";
import Model from "../../components/Model";

const Category = () => {
    const {data : categories, refetch} = useListCategoryQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [createCategory] = useCreateCategoryMutation();

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [name, setName] = useState('')
    const [updateName, setUpdateName] = useState('')
    const [modelVisible, setModelVisible] = useState(false)

    useEffect(() => {
        refetch()
    }, [refetch])

    const handleCreateCategory = async(e) => {
        e.preventDefault()
        if(!name) {
            toast.error('Category name is required')
            return
        }

        try{
            const result = await createCategory({name}).unwrap()
            if(result.error) {
                toast.error(result.error)
            } else {
                setName("")
                toast.success(`${result.name} is created`)
                refetch()
            }
         } catch(error) {
            console.error(error)
            toast.error('Creating category failed, try again.')
        }
    } 

    const handleUpdateCategory = async (e) => {
        e.preventDefault()

        if(!updateName) {
            toast.error('Category name is required')
            return
        }

        try {
            const result = await updateCategory({categoryId: selectedCategory._id, data: {name : updateName}}).unwrap()
            if(result.error) {
                toast.error(result.error)
            } else {
                toast.success(`${result.name} is updated`)
                setSelectedCategory(null)
                setUpdateName('')
                setModelVisible(false)
                refetch()
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteCategory = async () => {
        if(window.confirm('Are you sure?')) {
            try {
                const result = await deleteCategory(selectedCategory._id).unwrap()

                if(result.error) {
                    toast.error(result.error)
                } else {
                    toast.success(`${result.name} is deleted`)
                    setSelectedCategory(null)
                    setModelVisible(false)
                    refetch()
                }
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            {/* AdminMenu */}
            <div className="md: w-3/4 p-3">
                <div className="h-12">Manage Categories</div>
                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}></CategoryForm>
                <br />
                <hr />

                <div className="flex flex-wrap">
                    {categories?.map((category) => (
                        <div key={category._id}>
                            <button className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" onClick={() => {{
                                setModelVisible(true),
                                setSelectedCategory(category);
                                setUpdateName(category.name);
                            }}}>{category.name}</button>
                        </div>
                    ))}
                </div>
                <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
                    <CategoryForm
                    value={updateName}
                    setValue={(value) => setUpdateName(value)}
                    handleSubmit={handleUpdateCategory}
                    buttonText="Update"
                    handleDelete={handleDeleteCategory}
                    />
                </Model>
            </div>
        </div>
    )
}

export default Category
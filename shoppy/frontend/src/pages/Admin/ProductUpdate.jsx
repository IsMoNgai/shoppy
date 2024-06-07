import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import { useListCategoryQuery } from '../../redux/api/categoryApiSlice';
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
    const params = useParams();
    const { data: productData, refetch } = useGetProductByIdQuery(params._id);

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState('');
    const [quantity, setQuantity] = useState('');

    const navigate = useNavigate();

    const { data: categories } = useListCategoryQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        refetch()
    }, [refetch])

    useEffect(() => {
        if (productData) {
            setImage(productData.image);
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setStock(productData.countInStock);
        }
    }, [productData]);

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("brand", brand);
        formData.append("countInStock", stock);
        formData.append("category", category);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const result = await updateProduct({ productId: params._id, formData });
            if (result.error) {
                toast.error(result.error.data.error);
            } else {
                toast.success(`${result.data.name} is updated`);
                navigate('/admin/allproducts');
            }
        } catch (error) {
            console.error(error);
            toast.error("Product update failed. Try Again.");
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are you sure?");
            if (!answer) return;
            const result = await deleteProduct(params._id);
            toast.success(`${result.data.name} is deleted`);
            navigate('/admin/allproducts');
        } catch (error) {
            console.error(error);
            toast.error("Product delete failed. Try Again.");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12">Update Product</div>

                    {image && (
                        <div className="text-center">
                            <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}
                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                onChange={uploadFileHandler}
                                className={!image ? "hidden" : "text-black"}  
                            />
                        </label>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label> <br />
                                <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray text-black" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="name block">Price</label> <br />
                                <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray text-black" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div> 
                        </div>
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Quantity</label> <br />
                                <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray text-black" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="name block">Brand</label> <br />
                                <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray text-black" value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </div> 
                        </div>
                    </div>
                    <label htmlFor="" className="my-5">Description</label>
                    <textarea type="text" className="p-2 mb-3 bg-gray border rounded-lg w-[95%] text-black" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="name block">Count in Stock</label> <br />
                            <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray text-black" value={stock} onChange={(e) => setStock(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Category</label> <br />
                            <select placeholder="Choose Category" className="p-4 mb-3 w-[30rem] border rounded-lg bg-gray text-black" value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories?.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <button 
                            onClick={handleUpdate} 
                            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white">
                            Update
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="ml-5 py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white">
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;

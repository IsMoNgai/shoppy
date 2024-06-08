import { useAllProductsQuery } from "../redux/api/productApiSlice.js"
import Loader from "./Loader.jsx"
import SmallProduct from "../pages/Products/SmallProduct.jsx"

const Header = () => {
    const {data, isLoading, error} = useAllProductsQuery()

    console.log(data)

    if(isLoading) {
        return <Loader></Loader>
    }

    if(error) {
        return <h1>ERROR</h1>
    }

    return (
        <>
          <div className="flex justify-around">
            <div className="xl:block lg:hidden md:hidden sm:hiddem">
                <div className="grid grid-cols-2">
                    {data.map((product) => (
                        <div key={product._id}>
                            <div className="w-[20rem] ml-[2rem] p-3">
                                <div className="relative">
                                    <img src={product.image} alt={product.name} className="h-auto rounded"/>
                                    {/* HeartIcon product={product} */}

                                    <div className="p-54">
                                        <Link to={`/product/${product._id}`}>
                                            <div className="flex justify-between item-enter">
                                                <div>{product.name}</div>
                                                <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                                                $ {product.price}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>  
        </>
    )
}

export default Header
import SmallProduct from "../pages/Products/SmallProduct.jsx"
import { useGetTopProductQuery } from "../redux/api/productApiSlice.js"
import Loader from "./Loader.jsx"
import { Link } from "react-router-dom"
import ProductCarousel from "../pages/Products/ProductCarousel.jsx"

const Header = () => {
    const {data : products, isLoading, error} = useGetTopProductQuery()

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error loading product</div>;
    }

    return (
        <>
          <div className="flex justify-around">
            <div className="xl:block lg:hidden md:hidden sm:hiddem">
                <div className="grid grid-cols-2">
                    {products.map((product) => (
                        <div key={product._id}>
                            <SmallProduct product={product}></SmallProduct>
                        </div>
                    ))}
                </div>
            </div>
            <ProductCarousel></ProductCarousel>
            </div>  
        </>
    )
}

export default Header
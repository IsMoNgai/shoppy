import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <button className={`${isMenuOpen ? "top-2 right-2" : 'top-5 right-7'} bg-gray p-2 fixed rounded-lg`} onClick={toggleMenu}>
                {isMenuOpen ? (
                    <FaTimes color='black'/>
                ) : (
                    <>
                        <div className="div w-6 h-1 bg-black my-1"></div>
                        <div className="div w-6 h-1 bg-black my-1"></div>
                        <div className="div w-6 h-1 bg-black my-1"></div>   
                    </>
                )}
            </button>

            {isMenuOpen && (
                <section className="bg-gray p-4 fixed right-7 top-5">
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm border" to="/admin/dashboard" style={({isActive}) => ({
                                color: isActive ? 'greenyellow' : 'black',
                            })}>Admin Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm border" to="/admin/categorylist" style={({isActive}) => ({
                                color: isActive ? 'greenyellow' : 'black',
                            })}>Create Category</NavLink>
                        </li>
                        <li>
                            <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm border" to="/admin/productlist" style={({isActive}) => ({
                                color: isActive ? 'greenyellow' : 'black',
                            })}>Create Product</NavLink>
                        </li>
                        <li>
                            <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm border" to="/admin/allproducts" style={({isActive}) => ({
                                color: isActive ? 'greenyellow' : 'black',
                            })}>All Products</NavLink>
                        </li>
                        <li>
                            <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm border" to="/admin/userlist" style={({isActive}) => ({
                                color: isActive ? 'greenyellow' : 'black',
                            })}>Manage Users</NavLink>
                        </li>
                        <li>
                            <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm border" to="/admin/orderlist" style={({isActive}) => ({
                                color: isActive ? 'greenyellow' : 'black',
                            })}>Manage Orders</NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </>
    )
}

export default AdminMenu;
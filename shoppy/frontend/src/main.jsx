import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

// Private Route
import PrivateRoute from './components/PrivateRoute.jsx'

// Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import Category from './pages/Admin/Category.jsx'

/* route element from App jsx and Login jsx */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}> 
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />}/>
      </Route>

      {/* Admin Routes  */}
      <Route path="" element={<AdminRoute />}>
        <Route path='/admin/userlist' element={<UserList />}/>
        <Route path='/admin/categorylist' element={<Category/>}/>
      </Route>
    </Route>
  )
)

/* the root of rendering is created by router and store */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

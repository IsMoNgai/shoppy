import {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import {toast} from 'react-toastify'
import { useProfileMutation } from '../../redux/api/userApiSlice'

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {userInfo} = useSelector(state => state.auth)

    const [updateProfile, {isLoading : loadingUpdateProfile}] = useProfileMutation()

    // useEffect only activate when userInfo.email or username changes
    useEffect(() => {
        setEmail(userInfo.email)
        setUsername(userInfo.username)
    }, [userInfo.email, userInfo.username])

    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()
    
        if(password != confirmPassword) {
          toast.error('Passwords do not match')
        } else {
          try {
            const res = await updateProfile({email, username, password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success('Profile updated successfully')
          } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.message)
          }
        }
      }

  return (
    <div className='container mx-auto p-4 mt-[5rem]'>
        <div className="flex justify-center align-center md:flex md:space-x-4">
            {/* md:w-1/3 this make div like a grid */}
            <div className="md:w-1/3"> 
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <div className="label block text-black mb-2">Name</div>
                        <input type="text" placeholder='Enter name' className='form-input p-4 rounded-sm w-full' style={{ borderColor: 'black', borderWidth: '2px' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <div className="label block text-black mb-2">Email</div>
                        <input type="email" placeholder='Enter email' className='form-input p-4 rounded-sm w-full' style={{ borderColor: 'black', borderWidth: '2px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <div className="label block text-black mb-2">Password</div>
                        <input type="password" placeholder='Enter password' className='form-input p-4 rounded-sm w-full' style={{ borderColor: 'black', borderWidth: '2px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <div className="label block text-black mb-2">Confirm Password</div>
                        <input type="password" placeholder='Confirm Password' className='form-input p-4 rounded-sm w-full' style={{ borderColor: 'black', borderWidth: '2px' }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="flex justify-between">
                        <button type='submit' className='bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600'>Update</button>
                        <Link to="/user-orders" className='bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700'>My Order</Link>
                    </div>
                </form>
            </div>

            {loadingUpdateProfile && <Loader />}

        </div>
    </div>
  )
}

export default Profile
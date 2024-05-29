import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    isAdmin: {
        type: Boolean,
        requried: true,
        default: false,
    }
}, {timestamps: true} //timestamp can be used to store data of user's join date
)

const User = mongoose.model('User', userSchema)

export default User

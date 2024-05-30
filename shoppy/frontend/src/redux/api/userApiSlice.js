import {apiSlice} from './apiSlice'
import { USERS_URL } from '../constants'

/*
injectEndpoints: A method provided by Redux Toolkit Query to add additional endpoints to an existing API slice.
endpoints Function: This function takes a builder object and returns an object with endpoint definitions. In this case, it defines a single endpoint: login.
builder.mutation: Defines a mutation endpoint for performing a POST request to the server.
mutation is for PUT, DELETE, POST
builder.query is for fetching data only so GET

*/
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation({ //one can also use builder.query
            query : (data) => ({
                url : `${USERS_URL}/auth`,
                method : "POST",
                body: data,
            }),
        }),
        logout : builder.mutation({
            query : () => ({
                url : `${USERS_URL}/logout`,
                method : "POST",
            })
        }),
        register : builder.mutation({
            query : (data) => ({
                url: `${USERS_URL}`,
                method : "POST",
                body : data,
            }),
        }),
        profile : builder.mutation({
            query : (data) => ({
                url: `${USERS_URL}/profile`,
                method : "PUT",  
                body : data,
            })
        }),
        getUsers : builder.query({
            query : () => ({
                url : `${USERS_URL}`,
            }),
            providesTags : ['User'],
            keepUnusedDataFor : 5,
        }),

        deleteUser: builder.mutation({
            query : (userId) => ({
                url : `${USERS_URL}/${userId}`,
                method : "DELETE",
            }),
        }),

        getUserDetails : builder.query({
            query : (id) => ({
                url : `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor : 5,
        }),

        updateUser : builder.mutation({
            query : (data) => ({
                url : `${USERS_URL}/${data.userId}`,
                method : "PUT",
                body : data,
            }),
            invalidatesTags: ["User"],
        })
    }),
})

// `use${Login}Mutation`
// one can also use `use${Login}Query`

export const {
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} = userApiSlice;
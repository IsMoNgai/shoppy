import {apiSlice} from './apiSlice'
import { USERS_URL } from '../constants'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation({ //one can also use builder.query
            query : (data) => ({
                url : `${USERS_URL}/auth`,
                method : "POST",
                body: data,
            }),
        }),
    }),
})

// `use${Login}Mutation`
// one can also use `use${Login}Query`

export const {useLoginMutation} = userApiSlice;
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {removeToken, removeUser} from '../slices/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: async (headers) => {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }
        return headers
    },
})

export const baseApi = createApi({
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions)

        console.log(result);
        

        if (result?.error?.status === 401) {
            api.dispatch(removeUser())
            api.dispatch(removeToken())
        }
        return result
    },
    tagTypes: [],
    endpoints: () => ({}),
})

export default baseApi.reducer

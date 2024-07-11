import { baseApi } from '.';
import { setToken, setUser } from '../slices/authSlice';

const setUserState = (result: any, dispatch: any) => {
    const {user, token} = result.data.result
    dispatch(setUser(user))
    dispatch(setToken(token))
}

const authApi = baseApi.enhanceEndpoints({addTagTypes: ['Auth']}).injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/api/v1/auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
            onQueryStarted(arg, {queryFulfilled, dispatch}) {
                queryFulfilled.then((result) => {                    
                    setUserState(result, dispatch)
                })
            },
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/api/v1/auth/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
            onQueryStarted(arg, {queryFulfilled, dispatch}) {
                queryFulfilled.then((result) => {                    
                    setUserState(result, dispatch)
                })
            },
        }),
    }),
    overrideExisting: false,
})

export const {
    useRegisterMutation,
    useLoginMutation,
} = authApi

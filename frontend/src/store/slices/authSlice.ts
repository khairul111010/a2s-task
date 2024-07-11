import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem("token", action.payload)
        },
        removeToken: (state) => {
            state.token = null
            localStorage.removeItem("token")
        },
        removeUser: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
    },
})

export const {setUser, setToken, removeToken, removeUser} = authSlice.actions
export default authSlice.reducer

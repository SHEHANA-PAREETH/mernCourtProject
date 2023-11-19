import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE={
    user: JSON.parse(localStorage.getItem('user'))||{},
    openLoader:false
};
const userSlice=createSlice({
    name:'user',
    
    initialState:INITIAL_STATE,
    reducers:{
        setUser:(state,action)=>{
            
            state.user=action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
        },
        setOpenLoader:(state,action)=>{
            state.openLoader=action.payload
        }
    }
})

export const {setUser,setOpenLoader}=userSlice.actions
export default userSlice.reducer
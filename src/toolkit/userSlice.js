import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE={
    user: JSON.parse(localStorage.getItem('user'))||{},
    openLoader:false,
    searchText:"",
    selectedPage: 1
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
        },
        setSearchText:(state,action)=>{
            state.searchText=action.payload
        },
        setSelectedPage:(state,action)=>{
            state.selectedPage=action.payload
        }
    }
})

export const {setUser,setOpenLoader,setSearchText,setSelectedPage}=userSlice.actions
export default userSlice.reducer
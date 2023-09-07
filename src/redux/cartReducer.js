import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value:JSON.parse(sessionStorage.getItem("orderItem")) ||  [],
  },
  reducers: {

    update:(state, action)=>{
        state.value=action.payload

    },
    
  },
})

// Action creators are generated for each case reducer function
export const { update} = cartSlice.actions

export default cartSlice.reducer
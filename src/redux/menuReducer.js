import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    openMenu: [],
    activeParent:JSON.parse(sessionStorage.getItem("activeParent")) ||  ['medicine']
  },
  reducers: {

    update:(state, action)=>{
        state.openMenu=action.payload

    },
    updateActive:(state,action)=>{
        state.activeParent=action.payload
    }
    
  },
})

export const { update, updateActive} = menuSlice.actions

export default menuSlice.reducer
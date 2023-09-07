import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer'
import menuReducer from './menuReducer'

export default configureStore({
  reducer: {
    cart:cartReducer,
    menu:menuReducer
  },
})
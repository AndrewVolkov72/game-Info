import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface initialState {
  list:any[]
}
const initialState:initialState = {
  list:[]
}

const favouriteSlice = createSlice({
  name:'favourites',
  initialState,
  reducers:{
    addFavourite(state, action:PayloadAction<any>){
      state.list.push(action.payload)
    },
    removeFavourite(state, action:PayloadAction<number | string>){
      state.list = state.list.filter(item=>item.slug !== action.payload)
    }
  }
})
export const {addFavourite, removeFavourite} = favouriteSlice.actions
export default favouriteSlice.reducer
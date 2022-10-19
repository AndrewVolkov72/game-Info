import { createSlice } from "@reduxjs/toolkit";

interface initialState {

}

const initialState:initialState = {

}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{}
})

export default userSlice.reducer
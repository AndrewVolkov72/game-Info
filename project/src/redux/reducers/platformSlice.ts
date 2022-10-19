import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { apiKey, URL } from "../../constants/url";
import { IAsideItem } from "../../interface/IAsideItem";

interface InitialState {
  list: IAsideItem[];
  isLoading:boolean;
  error: string | null;
}

const initialState:InitialState = {
  list:[],
  isLoading: false,
  error:null,
}

export const getAllPlatforms = createAsyncThunk(
  'platforms/getAllPenres',
  async (_,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.PLATFORMS, {
      params: {
        key: apiKey
      }
    })
    .then(res=>{
      return res.data.results
    })
    .catch(error=>rejectWithValue(error.message))
  }
)

const platformSlice = createSlice({
  name:'platforms',
  initialState,
  reducers:{},
  extraReducers: (build) => {
    build
      .addCase(getAllPlatforms.pending, (state)=>{
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllPlatforms.fulfilled,(state, action:PayloadAction<IAsideItem[]>)=>{
        state.list = action.payload.slice(0,8)
        state.isLoading = false
        state.error = null
      })
      .addCase(getAllPlatforms.rejected,(state, action:PayloadAction<any>)=>{
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default platformSlice.reducer
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

export const getAllGenres = createAsyncThunk(
  'genres/getAllGenres',
  async (_,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.GENRES, {
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

const genresSlice = createSlice({
  name:'genres',
  initialState,
  reducers:{},
  extraReducers: (build) => {
    build
      .addCase(getAllGenres.pending, (state)=>{
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllGenres.fulfilled,(state, action:PayloadAction<IAsideItem[]>)=>{
        state.list = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getAllGenres.rejected,(state, action:PayloadAction<any>)=>{
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default genresSlice.reducer
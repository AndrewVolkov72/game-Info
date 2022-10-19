import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { apiKey, URL } from "../../constants/url"
import { IGameCard } from "../../interface/IGameCard"

interface initialState {
  list:IGameCard[];
  isLoading:boolean;
  error:string | null;
  count: number | null;
  isLoadingMore:boolean;
  page:number;
}

const initialState:initialState = {
  list:[],
  isLoading: false,
  isLoadingMore: false,
  error:null,
  count:null,
  page:1,
}

export const getGamesList = createAsyncThunk(
  'games/getGamesList',
  async (_,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.GAMES, {
      params: {
        key: apiKey,
        page:1,
      }
    })
    .then(res=>{
      return res.data
    })
    .catch(error=>rejectWithValue(error.message))
  }
)

export const getLoadMoreGames = createAsyncThunk(
  'games/getLoadMoreGames',
  async (page:number,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.GAMES, {
      params: {
        key: apiKey,
        page:page
      }
    })
    .then(res=>{
      return res.data
    })
    .catch(error=>rejectWithValue(error.message))
  }
)

const gameSlice = createSlice({
  name:'games',
  initialState,
  reducers:{
    nextPage(state){state.page++},
  },
  extraReducers: (build) => {
    build
      .addCase(getGamesList.pending, (state)=>{
        state.isLoading = true
        state.error = null
      })
      .addCase(getGamesList.fulfilled,(state, action:PayloadAction<{count:number, results:IGameCard[]}>)=>{
        state.list = []
        state.list = action.payload.results
        state.count = action.payload.count
        state.isLoading = false
        state.error = null
      })
      .addCase(getGamesList.rejected,(state, action:PayloadAction<any>)=>{
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getLoadMoreGames.pending, (state)=>{
        state.isLoadingMore = true
        state.error = null
      })
      .addCase(getLoadMoreGames.fulfilled,(state, action:PayloadAction<{count:number, results:IGameCard[]}>)=>{
        state.list.push(...action.payload.results)
        state.isLoadingMore = false
        state.error = null
      })
      .addCase(getLoadMoreGames.rejected,(state, action:PayloadAction<any>)=>{
        state.isLoadingMore = false
        state.error = action.payload
      })
  }
})

export const {nextPage} = gameSlice.actions
export default gameSlice.reducer
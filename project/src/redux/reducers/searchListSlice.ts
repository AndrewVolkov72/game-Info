import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { objSearchParams } from "../../constants/appSettings";
import { apiKey, URL } from "../../constants/url";
import { IGameCard } from "../../interface/IGameCard";
import { IParamsSearch } from "../../interface/IParamsSearch";

interface ISearchParams {
  paramsObj:IParamsSearch;
  page:number;
}

interface InitialState {
  list: IGameCard[];
  count:number | null;
  isLoading:boolean;
  error: string | null;
  paramsSearch: IParamsSearch;
}

const initialState:InitialState = {
  list: [],
  count:null,
  isLoading:false,
  error: null,
  paramsSearch: localStorage.getItem(objSearchParams) ? JSON.parse(localStorage.getItem(objSearchParams)!) : {},
}

export const getSearchList = createAsyncThunk(
  'search/getSearchList',
  async ({paramsObj, page}:ISearchParams,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.GAMES, {
      params: {
        key: apiKey,
        ...paramsObj,
        page:page
      }
    })
    .then(res=>{
      return res.data
    })
    .catch(error=>rejectWithValue(error.message))
  }
)

const searchList = createSlice({
  name:'search',
  initialState,
  reducers:{
    setTypeSearch(state, action:PayloadAction<IParamsSearch>){state.paramsSearch = action.payload}
  },
  extraReducers:(build)=>{
    build
      .addCase(getSearchList.pending, (state)=>{
        state.isLoading = true
        state.error = null
      })
      .addCase(getSearchList.fulfilled,(state, action:PayloadAction<{count:number, results:IGameCard[]}>)=>{
        state.list = action.payload.results
        state.count = action.payload.count
        state.isLoading = false
        state.error = null
      })
      .addCase(getSearchList.rejected,(state, action:PayloadAction<any>)=>{
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {setTypeSearch} = searchList.actions
export default searchList.reducer
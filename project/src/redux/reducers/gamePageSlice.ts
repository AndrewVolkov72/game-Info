import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey, GAMES_URL, URL } from "../../constants/url";
import { IScreenshotItem } from "../../interface/IScreenshotItem";
import { ISeriesGame } from "../../interface/ISeriesGame";
import { ITrailerItem } from "../../interface/ITrailerItem";


interface IPersonItems {
  id: number;
  image_background: string;
  name: string;
  slug: string;
}
interface IPlatformItem {
  id: number;
  name: string;
  slug: string;
}
interface IPlatform {
  platform:IPlatformItem;
}
interface initialState {
  person:{
    name:string;
    name_original:string;
    background_image:string;
    description_raw:string;
    developers:IPersonItems[];
    publishers:IPersonItems[];
    genres:IPersonItems[];
    metacritic:number;
    parent_platforms:IPlatform[];
    esrb_rating:IPlatformItem;
    released:string;
    website:string;
    isLoading:boolean;
    error:string | null;
  }
  screenshot: {
    screenshots:IScreenshotItem[];
    isLoading:boolean;
    error:string | null;
  }
  trailer: {
    trailers:ITrailerItem[];
    isLoading:boolean;
    error:string | null;
  },
  series: {
    series:ISeriesGame[];
    isLoading:boolean;
    error:string | null;
  }
}

const initialState:initialState = {
  person:{
    name:'',
    name_original:'',
    background_image:'',
    description_raw:'',
    developers:[],
    publishers:[],
    genres:[],
    parent_platforms:[],
    esrb_rating:{id:0, name:'', slug:''},
    metacritic:0,
    released:'',
    website:'',
    isLoading: false,
    error:null
  },
  screenshot:{
    screenshots:[],
    isLoading:false,
    error:null
  },
  trailer:{
    trailers:[],
    isLoading:false,
    error:null
  },
  series:{
    series:[],
    isLoading:false,
    error:null
  }
}

export const getGamePage = createAsyncThunk(
  'gamePage/getGamePage',
  async (name:string,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.GAMES +`/${name}`, {
      params: {
        key: apiKey,
      }
    })
    .then(res=>{
      return res.data
    })
    .catch(error=>rejectWithValue(error.message))
  }
)

export const getScreensGamePage = createAsyncThunk(
  'gamePage/getScreensGamePage',
  async (name:string,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.GAMES +`/${name}`+GAMES_URL.SCREENSHOTS, {
      params: {
        key: apiKey,
      }
    })
    .then(res=>{
      return res.data.results
    })
    .catch(error=>rejectWithValue(error.message))
  }
)

export const getTrailerGamePage = createAsyncThunk(
  'gamePage/getTrailerGamePage',
  async (name:string,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.GAMES +`/${name}`+GAMES_URL.MOVIES, {
      params: {
        key: apiKey,
      }
    })
    .then(res=>{
      return res.data.results
    })
    .catch(error=>rejectWithValue(error.message))
  }
)

export const getGameSeries = createAsyncThunk(
  'gamePage/getGameSeries',
  async (name:string,{rejectWithValue}) => {
    return axios.get(URL.BASE_URL + URL.GAMES + '/' + name + URL.GAME_SERIES, {
      params: {
        key: apiKey,
      }
    })
    .then(res=>{
      return res.data.results
    })
    .catch(error=>rejectWithValue(error.message))
  }
)

const gamePageSlice = createSlice({
  name:'gamePage',
  initialState,
  reducers:{},
  extraReducers: (build)=>{
    build
      .addCase(getGamePage.pending, (state)=>{
        state.person.isLoading = true
        state.person.error = null
      })
      .addCase(getGamePage.fulfilled,(state, action:PayloadAction<any>)=>{
        state.person = action.payload
        state.person.isLoading = false
        state.person.error = null
      })
      .addCase(getGamePage.rejected,(state, action:PayloadAction<any>)=>{
        state.person.isLoading = false
        state.person.error = action.payload
      })
      .addCase(getScreensGamePage.pending, (state)=>{
        state.screenshot.isLoading = true
        state.screenshot.error = null
      })
      .addCase(getScreensGamePage.fulfilled,(state, action:PayloadAction<any>)=>{
        state.screenshot.screenshots = action.payload
        state.screenshot.isLoading = false
        state.screenshot.error = null
      })
      .addCase(getScreensGamePage.rejected,(state, action:PayloadAction<any>)=>{
        state.screenshot.isLoading = false
        state.screenshot.error = action.payload
      })
      .addCase(getTrailerGamePage.pending, (state)=>{
        state.trailer.isLoading = true
        state.trailer.error = null
      })
      .addCase(getTrailerGamePage.fulfilled,(state, action:PayloadAction<any>)=>{
        state.trailer.trailers = action.payload
        state.trailer.isLoading = false
        state.trailer.error = null
      })
      .addCase(getTrailerGamePage.rejected,(state, action:PayloadAction<any>)=>{
        state.trailer.isLoading = false
        state.trailer.error = action.payload
      })
      .addCase(getGameSeries.pending, (state)=>{
        state.series.isLoading = true
        state.series.error = null
      })
      .addCase(getGameSeries.fulfilled,(state, action:PayloadAction<any>)=>{
        state.series.series = action.payload
        state.series.isLoading = false
        state.series.error = null
      })
      .addCase(getGameSeries.rejected,(state, action:PayloadAction<any>)=>{
        state.series.isLoading = false
        state.series.error = action.payload
      })
  }
})

export default gamePageSlice.reducer
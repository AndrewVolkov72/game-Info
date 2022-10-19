import { combineReducers } from "@reduxjs/toolkit";
import favouriteSlice from "./favouriteSlice";
import gamePageSlice from "./gamePageSlice";
import gameSlice from "./gameSlice";
import genresSlice from "./genresSlice";
import platformSlice from "./platformSlice";
import searchListSlice from "./searchListSlice";
import userSlice from "./userSlice";

export const RootReducer = combineReducers({
  genres: genresSlice,
  favourites:favouriteSlice,
  platforms:platformSlice,
  games:gameSlice,
  gamePage:gamePageSlice,
  searchLists:searchListSlice,
  user:userSlice
})

export type RootState = ReturnType<typeof RootReducer>
import { objSearchParams } from "../constants/appSettings"
import { IParamsSearch } from "../interface/IParamsSearch"

export const windowScrollTop = () => window.scrollTo({top:0, left:0, behavior:'auto'})

export const setLocalStorage = (obj:IParamsSearch) => localStorage.setItem(objSearchParams, JSON.stringify(obj))

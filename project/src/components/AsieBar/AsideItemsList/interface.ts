import { IAsideItem } from "../../../interface/IAsideItem";

export interface IAsideItemList {
  title:string;
  list: IAsideItem[];
  onClick:(str:string)=>void;
  url:string;
}
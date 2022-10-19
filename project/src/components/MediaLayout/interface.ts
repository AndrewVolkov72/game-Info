import { IScreenshotItem } from "../../interface/IScreenshotItem";
import { ITrailerItem } from "../../interface/ITrailerItem";


export interface IMediaLayout {
  images?:IScreenshotItem[];
  trailer?:ITrailerItem;
  onClick:()=>void;
  onClickIndex:(ind:number)=>void;
}
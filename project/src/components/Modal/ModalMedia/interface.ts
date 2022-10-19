import { IScreenshotItem } from "../../../interface/IScreenshotItem";
import { ITrailerItem } from "../../../interface/ITrailerItem";

export interface IModalMedia {
  images:IScreenshotItem[];
  trailers:ITrailerItem[];
  currentMediaIndex:number;
}
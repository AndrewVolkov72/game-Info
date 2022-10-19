import { IAsideItem } from "./IAsideItem";

export interface IGameCard {
  id:number;
  name:string;
  slug:string;
  metacritic?:number;
  background_image:string;
  genres?: IAsideItem[];
  released:string;
}
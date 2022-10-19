export interface IAsideItem {
  id: number;
  image_background: string;
  name: string;
  slug: string;
  onClick?:()=>void;
  url:string;
}
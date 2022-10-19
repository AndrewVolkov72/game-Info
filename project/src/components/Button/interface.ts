import React from "react";

export enum ButtonSize {
  SM = 'sm',
  MD = 'md',
  BIG = 'big'
}

export enum ButtonType {
  BTN = 'btn',
  LINK = 'link'
}

export interface IButton {
  text?:string | number;
  size: ButtonSize;
  type: ButtonType;
  onClick: undefined | (()=>void);
  icon?:boolean;
  iconElemet?:React.ReactNode;
  isLoading?:boolean;
  isDisable?:boolean;
  url?:string;
  className?:string;
}
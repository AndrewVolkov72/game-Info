import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Button.module.css'
import { ButtonSize, ButtonType, IButton } from './interface'
import { ReactComponent as Loader } from '../../images/circle.svg'

export const Button:FC<IButton> = (props) => {
  const {
    text,
    onClick,
    size,
    type,
    icon,
    iconElemet,
    isDisable,
    isLoading,
    url,
    className
  } = props
  
  const classSize = size === ButtonSize.SM ? s.sm : size === ButtonSize.MD ? s.md : s.big

  return (
    <>
    {type === ButtonType.BTN
      ?
        <button
          className={[className, s.btn, classSize].join(' ')}
          onClick={onClick}
          disabled={isDisable && isDisable}
        >
          {isLoading ?
          <Loader stroke='#fff' className={s.loader}/>
          :
            <>
            {icon && iconElemet}
            {text}
            </>
          }
        </button>
      : <NavLink
          to={url!}
          className={({ isActive }) => isActive ? [className, s.link, classSize, s.active].join(' ') : [s.link, classSize].join(' ')}
          onClick={onClick}
        >
          {text}
        </NavLink>}
    </>
  )
}

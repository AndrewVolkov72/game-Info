import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'
import { ISliderItem } from './interface'
import s from './SliderItem.module.css'

export const SliderItem:FC<ISliderItem> = (props) => {
  const {id, name, slug, background_image, released, onClick} = props

  return (
    <Link to={ROUTES.GAME.split(':')[0] + slug} className={s.item} onClick={onClick}>
      <img className={s.img} src={background_image} alt={name} />
      <p className={s.text}>{name} {released && (new Date(released).getFullYear())}</p>
    </Link>
  )
}

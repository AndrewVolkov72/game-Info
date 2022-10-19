import React, {FC} from 'react'
import { Link } from 'react-router-dom'
import { IAsideItem } from '../../../interface/IAsideItem'
import s from './AsideItem.module.css'

export const AsideItem:FC<IAsideItem> = (props) => {
  const {id, name, slug, image_background, onClick, url} = props
  
  return (
    <div>
      <Link to={url} className={s.item} onClick={onClick}>
        <img className={s.img} src={image_background} alt={slug} />
        <p className={s.title}>{name}</p>
      </Link>
    </div>
  )
}

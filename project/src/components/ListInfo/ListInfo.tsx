import React, {FC} from 'react'
import s from './ListInfo.module.css'
import { IListInfo } from './interface'

export const ListInfo:FC<IListInfo> = (props) => {
  const {title, children} = props
  return (
    <div className={s.item}>
      <p className={s.title}>{title}</p>
      <div className={s.content}>{children}</div>
    </div>
  )
}

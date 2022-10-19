import React, { FC } from 'react'
import s from './ContentLayout.module.css'
import { IContentLayout } from './interface'

export const ContentLayout:FC<IContentLayout> = (props) => {
  const {children, gridAutoRows} = props
  return (
    <div className={s.content} style={gridAutoRows ? {gridAutoRows:'auto'} : {}}>
      {children}
    </div>
  )
}

import React from 'react'
import s from './SkeletonCard.module.css'

export const SkeletonCard = () => {
  return (
    <div className={s.item}>
      <p className={s.img}></p>
      <div className={s.content}>
        <p className={s.text}></p>
        <p className={s.subtext}></p>
      </div>
    </div>
  )
}

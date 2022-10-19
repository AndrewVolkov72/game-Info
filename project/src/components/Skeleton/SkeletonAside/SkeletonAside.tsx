import React from 'react'
import s from './SkeletonAside.module.css'

export const SkeletonAside = () => {
  return (
    <div className={s.item}>
      <div className={s.avatar}></div>
      <div className={s.text}></div>
    </div>
  )
}

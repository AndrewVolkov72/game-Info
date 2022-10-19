import React from 'react'
import s from './SkeletonMedia.module.css'

export const SkeletonMedia = () => {
  return (
    <div className={s.item}>
      <div className={s.img}></div>
      <div className={s.content}>
        <div className={s.subtext}></div>
        <div className={s.subtext}></div>
      </div>
    </div>
  )
}

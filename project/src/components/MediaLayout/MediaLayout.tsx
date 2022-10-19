import React, {FC} from 'react'
import s from './MediaLayout.module.css'
import { IMediaLayout } from './interface'
import { Trailer } from '../Trailer/Trailer'

export const MediaLayout:FC<IMediaLayout> = (props) => {
  const {images, trailer, onClick, onClickIndex} = props

  const showCurrentItem = (ind:number) => {
    onClick()
    onClickIndex(ind)
  }
  
  return (
    <div className={s.media}>
      {trailer && <Trailer
        key={trailer.id}
        data={trailer.data}
        id={trailer.id}
        name={trailer.name}
        preview={trailer.preview}
      />}
      {images && images.map((item,ind)=><div
        key={item.id}
        className={s.wrapper}
        onClick={()=>showCurrentItem(ind)}
      >
        <div className={s.bg}></div>
        <img className={s.screenshot} src={item.image}/>
      </div>)}
      {images!.length > 1 && <button className={s.btn} onClick={()=>showCurrentItem(0)}>Показать всe мультимедиа</button>}
    </div>
  )
}
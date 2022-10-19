import React, { FC, useState } from 'react'
import s from './Trailer.module.css'
import { ReactComponent as Play } from '../../images/play.svg'
import { ITrailer } from './interface'

export const Trailer:FC<ITrailer> = (props) => {
  const {name, preview, data} = props
  const [isVideoShow, setIsVideoShow] = useState(false)

  return (
    <div className={s.tailer}>
      {!isVideoShow &&
        <div className={s.wrapper} onClick={()=>setIsVideoShow(true)}>
          <img
            className={s.img}
            src={preview}
            alt={name}
          />
          <button className={s.btn}><Play className={s.play}/></button>
        </div>
      }
      {isVideoShow &&
        <video
          className={s.video}
          controls
          preload={preview}
          autoPlay={isVideoShow}
        >
          <source src={data.max}/>
        </video>}
    </div>
  )
}

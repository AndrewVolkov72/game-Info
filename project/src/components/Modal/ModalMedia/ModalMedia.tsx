import React, {FC, useEffect, useState} from 'react'
import { Button } from '../../Button/Button'
import { ButtonSize, ButtonType } from '../../Button/interface'
import { Trailer } from '../../Trailer/Trailer'
import { IModalMedia } from './interface'
import s from './ModalMedia.module.css'

export const ModalMedia:FC<IModalMedia> = (props) => {
  const {images, trailers, currentMediaIndex} = props
  const [items, setItems] = useState<any[]>([])
  const [itemIndex, setItemIndex] = useState(currentMediaIndex)

  useEffect(()=>{
    setItems([...images, ...trailers])
  },[])

  return (
    <div className={s.main} onClick={e=>e.stopPropagation()}>
      <div className={s.content}>
        {items.length > 0 ?
          items[itemIndex]?.image
          ? 
          <div className={s.wrapper}>
            <img key={items[itemIndex].id} className={s.img} src={items[itemIndex].image}/>
            <button
              className={[s.img_btn, s.back].join(' ')}
              onClick={itemIndex === 0 ? ()=>setItemIndex(items.length-1) : ()=>setItemIndex(prev=>prev-1)}
            >
              {'<'}
            </button>
            <button
              className={[s.img_btn, s.next].join(' ')}
              onClick={itemIndex < items.length-1 ? ()=>setItemIndex(prev=>prev+1) : ()=>setItemIndex(0)}
            >
              {'>'}
            </button>
          </div>
          :
          <Trailer
            key={items[itemIndex].id}
            preview={items[itemIndex].preview}
            data={items[itemIndex].data}
            name={items[itemIndex].name}
            id={items[itemIndex].id}
          />
          : null
        }
      </div>
      <div className={s.btns}>
        <Button
          type={ButtonType.BTN}
          size={ButtonSize.MD}
          text={'Назад'}
          onClick={itemIndex === 0 ? ()=>setItemIndex(items.length-1) : ()=>setItemIndex(prev=>prev-1)}
        />
        <p className={s.subtext}><span>{itemIndex + 1}</span> из <span>{items.length}</span></p>
        <Button
          type={ButtonType.BTN}
          size={ButtonSize.MD}
          text={'Вперёд'}
          onClick={itemIndex < items.length-1 ? ()=>setItemIndex(prev=>prev+1) : ()=>setItemIndex(0)}
        />
      </div>
    </div>
  )
}

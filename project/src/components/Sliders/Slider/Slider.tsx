import React, { FC, useState, useEffect, useRef } from 'react'
import {ReactComponent as Arrow} from '../../../images/arrow.svg'
import s from './Slider.module.css'
import { ISlider } from './interface'
import { Button } from '../../Button/Button'
import { ButtonSize, ButtonType } from '../../Button/interface'
import { SliderItem } from '../SliderItem/SliderItem'
import { ISeriesGame } from '../../../interface/ISeriesGame'
import { windowScrollTop } from '../../../utils/functions'

export const Slider:FC<ISlider> = (props) => {
  const {arrays, title} = props

  const sliderElem = useRef<HTMLDivElement>(null)

  const [items, setItems] = useState<ISeriesGame[]>([])

  const [slideOnPage, setSlideOnPage] = useState(0)

  const nextSlide = () => {
    const arr:ISeriesGame[] = [...items]
    arr.push(arr.shift()!)
    setItems(arr)
  }

  const backSlide = () => {
    const arr:ISeriesGame[] = [...items]
    arr.unshift(arr.pop()!)
    setItems(arr)
  }

  useEffect(()=>{
    setSlideOnPage(Math.floor(sliderElem.current?.offsetWidth! / (250 + 22)))
  },[])

  useEffect(()=>{
    setItems([...arrays])
  },[slideOnPage])

  return (
    <div className="">
      <div className={s.nav}>
        {title && <h2 className={s.title}>{title}</h2>}
        {arrays.length > slideOnPage &&
          <div className={s.btns}>
            <div className={s.back}>
              <Button
                type={ButtonType.BTN}
                size={ButtonSize.SM}
                icon
                iconElemet={<Arrow className={s.left}/>}
                onClick={backSlide}
              />
            </div>
            <div className={s.next}>
              <Button
                type={ButtonType.BTN}
                size={ButtonSize.SM}
                icon
                iconElemet={<Arrow className={s.right}/>}
                onClick={nextSlide}
              />
            </div>
          </div>}
      </div>
      <div className={s.slider} ref={sliderElem}>
        <div className={s.content} style={{width:`calc((272px * ${slideOnPage}) - 22px)`}}>
          {items.map(item=>
            <SliderItem
              key={item.id}
              id={item.id}
              name={item.name}
              slug={item.slug}
              background_image={item.background_image}
              released={item.released}
              onClick={windowScrollTop}
            />)}
        </div>
      </div>
    </div>
  )
}

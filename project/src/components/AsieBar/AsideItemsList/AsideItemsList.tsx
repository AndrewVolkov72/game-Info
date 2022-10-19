import React, { FC, useState } from 'react'
import { IAsideItemList } from './interface'
import s from './AsideItemsList.module.css'
import { AsideItem } from '../AsideItem/AsideItem'
import { IAsideItem } from '../../../interface/IAsideItem'
import { ReactComponent as Arrow } from '../../../images/arrow.svg'
import { ROUTES } from '../../../routes/routes'

export const AsideItemsList:FC<IAsideItemList> = (props) => {
  const {title, list, onClick} = props
  
  const [currentList, setCurrentList] = useState<IAsideItem[]>(list.slice(0, Math.ceil(list.length / 2)))

  const showAllItems = () => {
    setCurrentList(list)
  }

  const hideItems = () => {
    setCurrentList(list.slice(0, Math.ceil(list.length / 2)))
  }
  
  return (
    <div className={s.item}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.main}>
        {currentList.map(item=><AsideItem
          key={item.id}
          id={item.id}
          name={item.name}
          slug={item.slug}
          image_background={item.image_background}
          url={ROUTES.SEARCH.split(':')[0]+item.slug+'/1'}
          onClick={()=>onClick(`${item.id}`)}
        />)}
        <div className="">
          <div
            className={s.btns}
            onClick={currentList.length === list.slice(0, Math.ceil(list.length / 2)).length ? showAllItems : hideItems}
          >
            <button
              className={s.btn}
            >
              {currentList.length !== list.slice(0, Math.ceil(list.length / 2)).length ? <Arrow/> : <Arrow className={s.active}/>}
            </button>
            <p
              className={s.btn_text}
            >
              {currentList.length === list.slice(0, Math.ceil(list.length / 2)).length ? 'Показать всё' : 'Скрыть'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

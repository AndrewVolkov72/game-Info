import React, {FC, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { windowScrollTop } from '../../utils/functions'
import { Button } from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/interface'
import { IPaginate } from './interface'
import s from './Paginate.module.css'

export const Paginate:FC<IPaginate> = (props) => {
  const {page} = useParams()
  const {count, itemsOnPage, currentUrl} = props
  const [currentPage, setCurrentPage] = useState(+page!)
  const pagesArray = []
  const totalPage = Math.ceil(count / itemsOnPage)

  const clickPage = (num:number) => {
    setCurrentPage(prev=>num)
    windowScrollTop()
  }

  for(let i = 0; i < totalPage;i++) {
    pagesArray.push(i+1)
  }

  useEffect(()=>{
    setCurrentPage(+page!)
  },[+page!])

  return (
    <div className={s.content}>
        {currentPage > 1 &&<Button
          key={'back'}
          type={ButtonType.LINK}
          size={ButtonSize.SM}
          text={'Назад'}
          url={currentUrl + (currentPage - 1)}
          onClick={()=>clickPage(currentPage - 1)}
        />}
        {currentPage > 2 && <Button
          key={currentUrl + 1}
          type={ButtonType.LINK}
          size={ButtonSize.SM}
          text={1}
          url={currentUrl + 1}
          onClick={()=>clickPage(1)}
        />}
        {currentPage > 1 && <Button
          key={currentUrl + (currentPage - 1)}
          type={ButtonType.LINK}
          size={ButtonSize.SM}
          text={currentPage - 1}
          url={currentUrl + (currentPage - 1)}
          onClick={()=>clickPage(currentPage - 1)}
        />}
        {currentPage < pagesArray.length && <Button
          key={currentUrl + currentPage}
          type={ButtonType.LINK}
          size={ButtonSize.SM}
          text={currentPage}
          url={currentUrl + currentPage}
          onClick={()=>clickPage(currentPage)}
        />}
        {currentPage + 1 < pagesArray.length && <Button
          key={currentUrl + currentPage + 1}
          type={ButtonType.LINK}
          size={ButtonSize.SM}
          text={currentPage + 1}
          url={currentUrl + (currentPage + 1)}
          onClick={()=>clickPage(currentPage + 1)}
        />}
        {currentPage < pagesArray.length - 2 && <p className={s.placeholder}>...</p>}
        <Button
          key={currentUrl + pagesArray.length}
          type={ButtonType.LINK}
          size={ButtonSize.SM}
          text={pagesArray.length}
          url={currentUrl + pagesArray.length}
          onClick={()=>clickPage(pagesArray.length)}
        />
        {currentPage < pagesArray.length && <Button
          key={'next'}
          type={ButtonType.LINK}
          size={ButtonSize.SM}
          text={'Вперед'}
          url={currentUrl + (currentPage + 1)}
          onClick={()=>clickPage(currentPage + 1)}
        />}
    </div>
  )
}

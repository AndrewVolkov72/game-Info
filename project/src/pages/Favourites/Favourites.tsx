import React, {useEffect, useState} from 'react'
import {ReactComponent as Heart} from '../../images/heart.svg'
import { ContentLayout } from '../../components/ContentLayout/ContentLayout'
import { GameCard } from '../../components/GameCard/GameCard'
import { Paginate } from '../../components/Paginate/Paginate'
import { itemsOnPage } from '../../constants/appSettings'
import { useAppSelector } from '../../hooks/useAppSelector'
import { ROUTES } from '../../routes/routes'
import s from './Favourites.module.css'
import { useParams } from 'react-router-dom'

export const Favourites = () => {
  const {page} = useParams()
  const {list} = useAppSelector(state=>state.favourites)

  const [currentPage, setCurrentPage] = useState(+page!)

  const lastPage = currentPage * itemsOnPage
  const firstPage = lastPage - itemsOnPage
  const currentList = list.slice(firstPage, lastPage)

  useEffect(()=>{
    setCurrentPage(+page!)
  },[page])

  return (
    <div>
      {list.length === 0 &&
        <h1 className={s.title}>В избранном сейчас пусто<br />Нажмите на <Heart stroke='indianred'/> чтобы добавить игру в ваш список</h1>
      }
      {list.length > 0 && <ContentLayout>
        {currentList.map(item=>
          <GameCard
            key={item.id}
            id={item.id}
            name={item.name}
            slug={item.slug}
            background_image={item.background_image}
            released={item.released}
            genres={item.genres}
            metacritic={item.metacritic}
          />)}
      </ContentLayout>}
      {list.length > itemsOnPage &&
        <div className={s.wrapper}>
          <Paginate
            count={list.length}
            itemsOnPage={itemsOnPage}
            currentUrl={ROUTES.FAVOURITES.split(':')[0]}
          />
        </div>}
    </div>
  )
}

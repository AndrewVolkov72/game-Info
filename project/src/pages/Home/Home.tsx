import React, {useEffect} from 'react'
import { Button } from '../../components/Button/Button'
import { ButtonSize, ButtonType } from '../../components/Button/interface'
import { ContentLayout } from '../../components/ContentLayout/ContentLayout'
import { GameCard } from '../../components/GameCard/GameCard'
import { SkeletonCard } from '../../components/Skeleton/SkeletonCard/SkeletonCard'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getGamesList, getLoadMoreGames, nextPage } from '../../redux/reducers/gameSlice'
import s from './Home.module.css'

export const Home = () => {
  const dispatch = useAppDispatch()
  const {list, isLoading, isLoadingMore, error, count, page} = useAppSelector(state=>state.games)

  const loadMoreGames = () => {
    dispatch(nextPage())
    dispatch(getLoadMoreGames(page+1))
  }

  useEffect(()=>{
    if(list.length === 0) {
      dispatch(getGamesList())
    }
  },[])

  return (
    <div className={s.home}>
      <h1 className={s.title}>Популярные игры и Новинки</h1>
      {isLoading ?
      <ContentLayout gridAutoRows>
        {Array.from({length:20}).map((_,i)=><SkeletonCard key={i}/>)}
      </ContentLayout>
      : <ContentLayout>
          {list && list.map(item=><GameCard
            key={item.id}
            id={item.id}
            name={item.name}
            slug={item.slug}
            background_image={item.background_image}
            released={item.released}
            genres={item.genres}
            metacritic={item.metacritic}
          />)}
      </ContentLayout>
      }
      {count && !isLoading && <div className={s.btns}>
        <Button
          text='Загрузить Ещё'
          onClick={Math.ceil(count! / 20) > page ? loadMoreGames : undefined}
          type={ButtonType.BTN}
          size={ButtonSize.MD}
          isDisable={isLoadingMore}
          isLoading={isLoadingMore}
         />
      </div>}
    </div>
  )
}
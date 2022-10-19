import React, {FC, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getAllGenres } from '../../../redux/reducers/genresSlice'
import { getAllPlatforms } from '../../../redux/reducers/platformSlice'
import { setTypeSearch } from '../../../redux/reducers/searchListSlice'
import { ROUTES } from '../../../routes/routes'
import { setLocalStorage, windowScrollTop } from '../../../utils/functions'
import { SkeletonAside } from '../../Skeleton/SkeletonAside/SkeletonAside'
import { AsideItemsList } from '../AsideItemsList/AsideItemsList'
import s from './Aside.module.css'
import { IAside } from './interface'

export const Aside:FC<IAside> = (props) => {
  const {onMenuClose} = props

  const dispatch = useAppDispatch()
  const {list, isLoading, error} = useAppSelector(state=>state.genres)
  const platforms = useAppSelector(state=>state.platforms)

  const genresSearch = (currentUrl:string) => {
    windowScrollTop()
    setLocalStorage({genres:currentUrl})
    dispatch(setTypeSearch({genres:currentUrl}))
    onMenuClose && onMenuClose()
  }

  const platformsSearch = (currentUrl:string) => {
    windowScrollTop()
    setLocalStorage({platforms:currentUrl})
    dispatch(setTypeSearch({platforms:currentUrl}))
    onMenuClose && onMenuClose()
  }
  
  useEffect(()=>{
    list.length === 0 && dispatch(getAllGenres())
    platforms.list.length === 0 && dispatch(getAllPlatforms())
  },[])

  return (
    <aside className={s.aside}>
      <div className={s.wrapper}>
        <Link className={s.link} to={ROUTES.HOME}>Главная</Link>
      </div>
      {isLoading ?
        <>
        {Array.from({length:5}).map((_,i)=><SkeletonAside key={i}/>)}
        </>
      : <AsideItemsList
          url={''}
          onClick={genresSearch}
          title='Жанры'
          list={list}
        />}
      {platforms.isLoading ?
        <>
        {Array.from({length:3}).map((_,i)=><SkeletonAside key={i}/>)}
        </>
      : <AsideItemsList
          url={''}
          onClick={platformsSearch}
          title='Платформы'
          list={platforms.list}
          />}
    </aside>
  )
}

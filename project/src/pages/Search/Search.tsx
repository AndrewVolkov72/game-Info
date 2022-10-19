import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ContentLayout } from '../../components/ContentLayout/ContentLayout'
import { GameCard } from '../../components/GameCard/GameCard'
import { Loader } from '../../components/Loader/Loader'
import { Paginate } from '../../components/Paginate/Paginate'
import { itemsOnPage } from '../../constants/appSettings'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getSearchList } from '../../redux/reducers/searchListSlice'
import { ROUTES } from '../../routes/routes'
import s from './Search.module.css'

export const Search = () => {
  const {name, page} = useParams()
  const dispatch = useAppDispatch()
  const {list, isLoading, error, count, paramsSearch} = useAppSelector(state=>state.searchLists)

  useEffect(()=>{
    if(name) {
      dispatch(getSearchList({paramsObj:{...paramsSearch}, page:+page!}))
    }
  },[name, page])

  return (
    <div>
      {count! && <h1 className={s.title}>По запросу {name} найдено: {count}</h1>}
      {isLoading ? <div className={s.loading}><Loader/><p className={s.load_text}>Идет загрузка...</p></div> :
      <>
      {count! > 0 &&
        <ContentLayout>
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
        </ContentLayout>}
      {count! > itemsOnPage && <div className={s.wrapper}>
        <Paginate
          count={count!}
          itemsOnPage={itemsOnPage}
          currentUrl={ROUTES.SEARCH.split(':')[0]+name+'/'}
        />
      </div>}
      </>}
    </div>
  )
}

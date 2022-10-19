import React, { useState, useEffect } from 'react'
import {ReactComponent as Heart} from '../../images/heart.svg'
import s from './Game.module.css'
import { Link, useParams } from 'react-router-dom'
import { ListInfo } from '../../components/ListInfo/ListInfo'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getGamePage, getGameSeries, getScreensGamePage, getTrailerGamePage } from '../../redux/reducers/gamePageSlice'
import { Metascore } from '../../components/Metascore/Metascore'
import { ROUTES } from '../../routes/routes'
import { ModalLayout } from '../../components/Modal/ModalLayout/ModalLayout'
import { ModalMedia } from '../../components/Modal/ModalMedia/ModalMedia'
import { MediaLayout } from '../../components/MediaLayout/MediaLayout'
import { addFavourite, removeFavourite } from '../../redux/reducers/favouriteSlice'
import { Slider } from '../../components/Sliders/Slider/Slider'
import { Button } from '../../components/Button/Button'
import { ButtonSize, ButtonType } from '../../components/Button/interface'
import { setTypeSearch } from '../../redux/reducers/searchListSlice'
import { setLocalStorage, windowScrollTop } from '../../utils/functions'
import { Loader } from '../../components/Loader/Loader'
import { SkeletonMedia } from '../../components/Skeleton/SkeletonMedia/SkeletonMedia'
import { SkeletonSlider } from '../../components/Skeleton/SkeletonSlider/SkeletonSlider'

export const Game = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch()

  const {list} = useAppSelector(state=>state.favourites)

  const person = useAppSelector(state=>state.gamePage.person)
  const screenshot = useAppSelector(state=>state.gamePage.screenshot)
  const trailer = useAppSelector(state=>state.gamePage.trailer)
  const series = useAppSelector(state=>state.gamePage.series)

  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [isFavourites, setIsFavourites] = useState(false)
  
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const date = new Date(person.released)

  const findIsFavourites = (id:string | number) => list.map(item=>item.slug === id && setIsFavourites(true))

  const addFav = () => {
    dispatch(addFavourite(person))
    setIsFavourites(true)
  }

  const removeFav = (id:any) => {
    dispatch(removeFavourite(id))
    setIsFavourites(false)
  }

  const genresSearch = (url:string) => {
    windowScrollTop()
    setLocalStorage({genres:url})
    dispatch(setTypeSearch({genres:url}))
  }

  const publisherSearch = (url:string) => {
    windowScrollTop()
    setLocalStorage({publishers:url})
    dispatch(setTypeSearch({publishers:url}))
  }

  const platformsSearch = (url:string) => {
    windowScrollTop()
    setLocalStorage({platforms:url})
    dispatch(setTypeSearch({platforms:url}))
  }

  useEffect(()=>{
    if(id){
      dispatch(getGamePage(id))
      dispatch(getScreensGamePage(id))
      dispatch(getTrailerGamePage(id))
      dispatch(getGameSeries(id))
      setIsFavourites(false)
      findIsFavourites(id)
    }
  },[id])

  return (
    <div className={s.page}>
      {person.isLoading ? <div className={s.loading}><Loader/><p className={s.load_text}>Идет загрузка...</p></div> :
      <>
      <h1 className={s.title}>{person?.name}</h1>
      <div className={s.main}>
        <div className={s.game}>
          <div className={s.head}>
            <img className={s.img} src={person.background_image} alt="" />
          </div>
          <p className={s.desc}>{person.description_raw}</p>
          <div className={s.page_other}>
            <Button
              size={ButtonSize.MD}
              type={ButtonType.BTN}
              icon
              iconElemet={<Heart className={isFavourites ? s.active : s.fav_icon}/>}
              text={!isFavourites ? 'Добавить в избранное' : 'Убрать из избранного'}
              onClick={!isFavourites ? addFav : ()=>removeFav(id)}
            />
            <div className={s.btn_show_media}>
              <Button
                size={ButtonSize.MD}
                type={ButtonType.BTN}
                text={'Показать все мультимедиа'}
                onClick={()=>setIsMediaOpen(true)}
              />
            </div>
          </div>
          <div className={s.content}>
            {person.parent_platforms.length > 0 &&
              <ListInfo title='Платформы'>
                {person.parent_platforms.map(item=><Link
                  key={item.platform.id}
                  to={ROUTES.SEARCH.split(':')[0]+item.platform.slug+'/1'}
                  className={[s.link, s.items].join(' ')}
                  onClick={()=>platformsSearch(`${item.platform.id}`)}
                >
                  {item.platform?.name}
                </Link>)}
              </ListInfo>}
            {person.metacritic &&
              <ListInfo title='Оценка Metacritic'>
                <Metascore metacritic={person.metacritic}/>
              </ListInfo>}
            {person.genres.length > 0 &&
              <ListInfo title='Жанры'>
                {person.genres.map(item=><Link
                  key={item.id}
                  to={ROUTES.SEARCH.split(':')[0]+item.slug+'/1'}
                  className={[s.link,s.items].join(' ')}
                  onClick={()=>genresSearch(item.slug)}
                >
                  {item?.name}
                </Link>)}
              </ListInfo>}
            {person.released &&
              <ListInfo title='Дата релиза'>
                <p className={s.items}>{date.toLocaleDateString()}</p>
              </ListInfo>}
            <ListInfo title='Разработчики'>
              {person.developers.map(item=><p key={item.id} className={s.items}>{item?.name}</p>)}
            </ListInfo>
            {person.publishers.length > 0 &&
              <ListInfo title='Издатели'>
                {person.publishers.map(item=><Link
                  key={item.id}
                  to={ROUTES.SEARCH.split(':')[0]+item.slug+'/1'}
                  className={[s.link,s.items].join(' ')}
                  onClick={()=>publisherSearch(item.slug)}
                >
                  {item?.name}
                </Link>)}
              </ListInfo>}
            {person.esrb_rating &&
              <ListInfo title='Возрастной рейтинг'>
                <p className={s.items}>{person.esrb_rating?.name}</p>
              </ListInfo>}
            {person.website &&
              <ListInfo title='Сайт'>
                <a
                  className={[s.link, s.items].join(' ')}
                  href={person.website}
                  target={'_blank'}
                >
                  {person.website}
                </a>
              </ListInfo>}
          </div>
        </div>
        <div className={s.media}>
          {screenshot.isLoading && trailer.isLoading
          ? <SkeletonMedia/>
          : <MediaLayout
            images={screenshot.screenshots}
            trailer={trailer.trailers[0]}
            onClick={()=>setIsMediaOpen(true)}
            onClickIndex={setCurrentMediaIndex}
          />}
          <div className={s.btns}>
            <Button
              size={ButtonSize.MD}
              type={ButtonType.BTN}
              icon
              iconElemet={<Heart className={isFavourites ? s.active : s.fav_icon}/>}
              text={!isFavourites ? 'Добавить в избранное' : 'Убрать из избранного'}
              onClick={!isFavourites ? addFav : ()=>removeFav(id)}
            />
          </div>
        </div>
      </div>
      {isMediaOpen && 
      <ModalLayout onClose={()=>setIsMediaOpen(false)}>
        <ModalMedia images={screenshot.screenshots} trailers={trailer.trailers} currentMediaIndex={currentMediaIndex}/>
      </ModalLayout>}
      {series.series.length > 0 && 
        <>
          {series.isLoading
            ? <div className={s.wrapper}><SkeletonSlider/></div>
            : <Slider
                title={`Игры из этой серии (${series.series.length})`}
                arrays={series.series}
              />
          }
        </>
      }
      </>}
    </div>
  )
}
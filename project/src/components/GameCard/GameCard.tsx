import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IGameCard } from '../../interface/IGameCard'
import { ROUTES } from '../../routes/routes'
import { windowScrollTop } from '../../utils/functions'
import { Metascore } from '../Metascore/Metascore'
import s from './GameCard.module.css'

export const GameCard:FC<IGameCard> = (props) => {
  const {
    id,
    name,
    slug,
    background_image,
    metacritic,
    released,
    genres,
  } = props

  const date = new Date(released)
  
  return (
    <Link to={ROUTES.GAME.split(':')[0]+slug} className={s.item} onClick={windowScrollTop}>
      <img className={s.img} src={background_image} alt={name} />
      <div className={s.content}>
        <div className={s.title}>
          <p className={s.name}>{name}</p>
          {metacritic && metacritic > 0 && <Metascore metacritic={metacritic}/>}
        </div>
        {released &&
          <div className={s.wrapper}>
            <p className={s.subtitle}>Дата релиза:</p>
            <p className={s.genres}>{date.toLocaleDateString()}</p>
          </div>}
        {genres && genres?.length > 0 &&
          <div className={s.wrapper}>
            <p className={s.subtitle}>Жанр:</p>
            <div className={s.sublist}>
              {genres.map(item=><p className={s.genres} key={item.id}>{item.name}</p>)}
            </div>
          </div>}
      </div>
    </Link>
  )
}

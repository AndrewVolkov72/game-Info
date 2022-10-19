import React, {FC} from 'react'
import { IMetascore } from './interface'
import s from './Metascore.module.css'

export const Metascore:FC<IMetascore> = (props) => {
  const {metacritic} = props
  const className = metacritic >= 75 ? s.green : metacritic >= 40 ? s.yellow : s.red

  return (
    <div className={[s.item, className].join(' ')}>
      <p>{metacritic}</p>
    </div>
  )
}

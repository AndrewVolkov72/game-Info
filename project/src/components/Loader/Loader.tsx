import React from 'react'
import {ReactComponent as Loading} from '../../images/loading.svg'
import s from './Loader.module.css'

export const Loader = () => {
  return (
      <Loading className={s.item}/>
  )
}

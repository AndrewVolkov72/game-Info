import React, {FC} from 'react'
import s from './BurgerMenu.module.css'
import { Aside } from '../AsieBar/Aside/Aside'
import { SearchInput } from '../SearchInput/SearchInput'
import { IBurgerMenu } from './interface'

export const BurgerMenu:FC<IBurgerMenu> = (props) => {
  const {link, onMenuClose} = props
  return (
    <div className=''>
      <div className="">
        <div className={s.item}><SearchInput onMenuClose={onMenuClose}/></div>
        <div className={s.item}>{link}</div>
        <div className={s.item}><Aside onMenuClose={onMenuClose}/></div>
      </div>
    </div>
  )
}

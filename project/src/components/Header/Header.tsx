import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { SearchInput } from '../SearchInput/SearchInput'
import {ReactComponent as Logo} from '../../images/logo/gamepad.svg'
import {ReactComponent as Cancel} from '../../images/burger-menu/cancel.svg'
import {ReactComponent as Menu} from '../../images/burger-menu/menu.svg'
import s from './Header.module.css'
import { Button } from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/interface'
import { BurgerMenu } from '../BurgerMenu/BurgerMenu'

export const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false)

  return (
    <>
    <header className={s.header}>
        <Link className={s.logo} to={ROUTES.HOME}>GamesInfo<Logo className={s.img}/></Link>
      <div className={s.wrapper}>
        <div className={s.navs}><Link to={ROUTES.FAVOURITES.split(':')[0]+'1'} className={s.link}>Избранное</Link></div>
        <div className={s.search}><SearchInput/></div>
        <div className={s.btns}>
          <Button
            size={ButtonSize.SM}
            type={ButtonType.BTN}
            icon
            iconElemet={isShowMenu ? <Cancel stroke='#fff' height={40} width={40} /> :<Menu stroke='#fff' height={40} width={40} />}
            onClick={()=>setIsShowMenu(prev=>!prev)}
          />
        </div>
      </div>
    </header>
    {isShowMenu &&
      <BurgerMenu
        link={<Link to={ROUTES.FAVOURITES.split(':')[0]+'1'} onClick={()=>setIsShowMenu(false)} className={s.link}>Перейти в Избранное</Link>}
        onMenuClose={()=>setIsShowMenu(false)}
      />}
    </>
  )
}

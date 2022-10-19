import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { Button } from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/interface'
import { ReactComponent as Search } from '../../images/search.svg'
import s from './SearchInput.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setTypeSearch } from '../../redux/reducers/searchListSlice'
import { setLocalStorage, windowScrollTop } from '../../utils/functions'
import { ISearchInput } from './interface'

export const SearchInput:FC<ISearchInput> = (props) => {
  const {onMenuClose} = props

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  const searchNavigate = () => {
    navigate(ROUTES.SEARCH.split(':')[0]+value+'/1')
    setLocalStorage({search:value})
    dispatch(setTypeSearch({search:value}))
    setValue('')
    windowScrollTop()
    onMenuClose && onMenuClose()
  }

  const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.key === "Enter") {
      searchNavigate()
    }
  }

  return (
    <div className={s.wrapper}>
      <input
        className={s.input}
        value={value}
        onChange={e=>setValue(e.target.value)}
        type="text"
        placeholder='Поиск...'
        onKeyDown={value.trim().length > 0 ? onKeyDown : undefined}
      />
      <div className={s.btn}>
        <Button
          type={ButtonType.BTN}
          size={ButtonSize.SM}
          icon={true}
          iconElemet={<Search className={s.img}/>}
          onClick={value.trim().length > 0 ? searchNavigate : undefined}
        />
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { SignForm } from '../../components/SignForm/SignForm'
import { ROUTES } from '../../routes/routes'
import s from './Login.module.css'

export const Login = () => {
  return (
    <div className={s.page}>
      <div className={s.form}>
        <SignForm title='Вход в систему' onClick={()=>''} isFullDataForm={false} />
        <p className={s.subtitle}>У вас нет учетной записи? <Link className={s.link} to={ROUTES.REGISTER}>Зарегистрироваться</Link></p>
      </div>
    </div>
  )
}

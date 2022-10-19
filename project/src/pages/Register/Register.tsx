import React from 'react'
import { Link } from 'react-router-dom'
import { SignForm } from '../../components/SignForm/SignForm'
import { ROUTES } from '../../routes/routes'
import s from './Register.module.css'

export const Register = () => {
  return (
    <div className={s.page}>
      <div className={s.form}>
        <SignForm title='Регистрация аккаунта' onClick={()=>''} isFullDataForm/>
        <p className={s.subtitle}>У вас уже есть аккаунт? <Link className={s.link} to={ROUTES.LOGIN}>Войти</Link></p>
      </div>
    </div>
  )
}

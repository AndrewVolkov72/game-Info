import React, { FC, useState } from 'react'
import { ISignForm } from './interface'
import s from './SignForm.module.css'
import {ReactComponent as Eye} from '../../images/eye.svg'
import {ReactComponent as EyeClose} from '../../images/eye-off.svg'
import { Button } from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/interface'

export const SignForm:FC<ISignForm> = (props) => {
  const {title, onClick, isFullDataForm} = props
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)

  return (
    <form className={s.form} onSubmit={e=>e.preventDefault()}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.content}>
        {isFullDataForm &&
          <div className={s.wrapper}>
            <input
              className={s.input}
              value={name}
              onChange={e=>setName(e.target.value)}
              type="text"
              placeholder='Введите Имя'
            />
          </div>
        }
        <div className={s.wrapper}>
          <input
            className={s.input}
            value={email}
            onChange={e=>setEmail(e.target.value)}
            type="text"
            placeholder='Введите email'
          />
        </div>
        <div className={[s.pas, s.wrapper].join(' ')}>
          <input
            className={[s.input, s.password].join(' ')}
            value={password}
            onChange={e=>setPassword(e.target.value)}
            type={showPass ? "text" : 'password'}
            placeholder='Введите пароль'
          />
          {showPass
            ? <Eye className={s.eye} onClick={()=>setShowPass(false)}/>
            : <EyeClose className={s.eye} onClick={()=>setShowPass(true)}/>
          }
        </div>
      </div>
      <div className="">
        <Button
          type={ButtonType.BTN}
          size={ButtonSize.BIG}
          text={'Подтвердить'}
          onClick={onClick}
        />
      </div>
    </form>
  )
}

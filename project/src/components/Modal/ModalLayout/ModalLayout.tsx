import React, {FC} from 'react'
import s from './ModalLayout.module.css'
import { IModalLayout } from './interface'
import { Button } from '../../Button/Button'
import { ButtonSize, ButtonType } from '../../Button/interface'

export const ModalLayout:FC<IModalLayout> = (props) => {
  const {onClose, children} = props
  return (
    <div className={s.modal} onClick={onClose}>
      <div className={s.btns}>
        <Button
          type={ButtonType.BTN}
          size={ButtonSize.SM}
          icon
          iconElemet={<span className={s.btn}>X</span>}
          onClick={onClose}
        />
      </div>
      {children}
    </div>
  )
}

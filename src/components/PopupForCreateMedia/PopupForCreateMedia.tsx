import React from 'react'

import styles from './PopupForCreateMedia.module.css'
import CustomButton from '../CustomButton/CustomButton'

type PopupPropsType = {
  popupTitle: string
  isPopupActive?: boolean
  children?: React.ReactNode
  onCloseHandler: () => void
  onSubmitHandler?: () => void
}

const PopupForCreateMedia: React.FC<PopupPropsType> = ({
  popupTitle,
  children,
  isPopupActive,
  onCloseHandler,
  onSubmitHandler,
}) => {
  return (
    <div
      role='presentation'
      className={`${styles.modal} ${isPopupActive && styles.modal_open}`}
      onClick={onCloseHandler}
    >
      <div
        role='presentation'
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div role='presentation' className={styles.cross} onClick={onCloseHandler} />
        <h2 className={styles.modal__title}>{popupTitle}</h2>
        {children}
        <div className={styles.modal__btnGroup}>
          <CustomButton name='Отменить' onClick={onCloseHandler} className={styles.cancelBtn} />
          <CustomButton name='Добавить' onClick={onSubmitHandler} className={styles.deleteBtn} />
        </div>
      </div>
    </div>
  )
}

export default PopupForCreateMedia

import React from 'react'
import styles from './UploadDescriptionComponent.module.css'

type UploadDescriptionComponentPropsType = {
  value: string
  title: string
  placeholder: string
  callbackHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const UploadDescriptionComponent: React.FC<UploadDescriptionComponentPropsType> = ({
  value,
  title,
  placeholder,
  callbackHandler,
}) => {
  return (
    <div className={styles.uploadDescriptionContainer}>
      <h4 className={styles.uploadDescriptionTitle}>{title}</h4>
      <div className={styles.uploadDescriptionBoard}>
        <textarea
          value={value}
          placeholder={placeholder}
          className={styles.uploadDescriptionText}
          onChange={callbackHandler}
        ></textarea>
      </div>
    </div>
  )
}

export default React.memo(UploadDescriptionComponent)

import React from 'react'
import styles from './CustomDoubleInputComponent.module.css'
import CustomInput from '../CustomInput/CustomInput'

type CustomNameInputType = {
  name: string
  firstPlaceholder: string
  secondPlaceholder: string
  firstSubTitle: string
  secondSubTitle: string
  type: string
}

const CustomDoubleInputComponent: React.FC<CustomNameInputType> = ({
  name,
  firstSubTitle,
  secondSubTitle,
  firstPlaceholder,
  secondPlaceholder,
  type,
}) => {
  return (
    <div className={styles.objectCoordinatesContainer}>
      <h4 className={styles.objectCoordinatesTitle}>{name}</h4>
      <div className={styles.allCoordinatesBlock}>
        <div className={styles.coordinatesBlock}>
          <p className={styles.coordinatesTitle}>{firstSubTitle}</p>
          <CustomInput placeholder={firstPlaceholder} type={type} />
        </div>
        <div className={styles.coordinatesBlock}>
          <p className={styles.coordinatesTitle}>{secondSubTitle}</p>
          <CustomInput placeholder={secondPlaceholder} type={type} />
        </div>
      </div>
    </div>
  )
}

export default CustomDoubleInputComponent

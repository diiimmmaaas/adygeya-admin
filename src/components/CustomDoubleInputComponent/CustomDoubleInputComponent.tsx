import React from 'react'
import styles from './CustomDoubleInputComponent.module.css'
import CustomInput from '../CustomInput/CustomInput'

type CustomNameInputType = {
  firstValue: string | number
  secondValue: string | number
  name: string
  firstPlaceholder: string
  secondPlaceholder: string
  firstSubTitle: string
  secondSubTitle: string
  type: string
  callbackFirstHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  callbackSecondHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomDoubleInputComponent: React.FC<CustomNameInputType> = ({
  firstValue,
  secondValue,
  name,
  firstSubTitle,
  secondSubTitle,
  firstPlaceholder,
  secondPlaceholder,
  type,
  callbackFirstHandler,
  callbackSecondHandler,
}) => {
  return (
    <div className={styles.objectCoordinatesContainer}>
      <h4 className={styles.objectCoordinatesTitle}>{name}</h4>
      <div className={styles.allCoordinatesBlock}>
        <div className={styles.coordinatesBlock}>
          <p className={styles.coordinatesTitle}>{firstSubTitle}</p>
          <CustomInput
            value={firstValue}
            placeholder={firstPlaceholder}
            type={type}
            callbackHandler={callbackFirstHandler}
          />
        </div>
        <div className={styles.coordinatesBlock}>
          <p className={styles.coordinatesTitle}>{secondSubTitle}</p>
          <CustomInput
            value={secondValue}
            placeholder={secondPlaceholder}
            type={type}
            callbackHandler={callbackSecondHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(CustomDoubleInputComponent)

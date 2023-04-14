import React, { FC } from 'react'
import styles from './PriceComponent.module.css'
import CustomNameInput from '../CustomNameInput/CustomNameInput'
import CustomButton from '../CustomButton/CustomButton'
import exitImg from '../../assets/icons/exit.svg'

type PriceComponentPropsType = {
  addOnePoint: () => void
  addDeletePoint: () => void
  prices: PricesType[]
  onChangeNameOfTicketHandler: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onChangeCountOfTicketHandler: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

type PricesType = {
  name: string
  value: string
}

const PriceComponent: FC<PriceComponentPropsType> = ({
  addOnePoint,
  addDeletePoint,
  prices,
  onChangeNameOfTicketHandler,
  onChangeCountOfTicketHandler,
}) => {
  const addOnePointHandler = () => {
    addOnePoint()
  }

  const addDeletePointHandler = () => {
    addDeletePoint()
  }

  return (
    <div className={styles.priceContainer}>
      <h4 className={styles.priceTitle}>Цена</h4>
      {prices?.map((price, index) => {
        return (
          <div key={index} className={styles.priceBlock}>
            <img
              onClick={addDeletePointHandler}
              className={styles.exitImg}
              src={exitImg}
              alt='exitImg'
            />
            <CustomNameInput
              value={price.name}
              name='Категория для цены'
              placeholder='Введите категорию для установки цены билета'
              type='text'
              callbackHandler={(e) => onChangeNameOfTicketHandler(e, index)}
            />
            <CustomNameInput
              value={price.value}
              name='Стоимость'
              placeholder='Введите стоимость билета'
              type='text'
              callbackHandler={(e) => onChangeCountOfTicketHandler(e, index)}
            />
            <div className={styles.strip}></div>
          </div>
        )
      })}

      <div className={styles.addPointBlock}>
        <CustomButton
          onClick={addOnePointHandler}
          name='Добавить категорию'
          className={styles.addPoint}
        />
      </div>
    </div>
  )
}

export default PriceComponent

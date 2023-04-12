import React, { FC, useState } from 'react';
import styles from './PriceComponent.module.css'
import CustomNameInput from '../CustomNameInput/CustomNameInput'
import CustomButton from '../CustomButton/CustomButton'
import exitImg from '../../assets/icons/exit.svg';

type PriceComponentPropsType = {
  onChangeNameOfTicketHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeCountOfTicketHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type PricesType = {
  name: string
  count: string
}

const PriceComponent: FC<PriceComponentPropsType> = ({
  onChangeNameOfTicketHandler,
  onChangeCountOfTicketHandler,
}) => {
  const [prices, setPrices] = useState<PricesType[]>([])

  const addOnePointHandler = () => {
    const newPrice = {
      name: '',
      count: '',
    }

    setPrices([
      ...prices,
      newPrice
    ])
  }

  const addDeletePointHandler = () => {
    const newArray = [
      ...prices.filter(
        (el, i) => i !== prices.length - 1,
      ),
    ]

    setPrices(newArray)
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
              name='Категория для цены'
              placeholder='Введите категорию для установки цены билета'
              type='text'
              callbackHandler={onChangeNameOfTicketHandler}
            />
            <CustomNameInput
              name='Стоимость'
              placeholder='Введите стоимость билета'
              type='text'
              callbackHandler={onChangeCountOfTicketHandler}
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

import React, { FC, useState } from 'react'
import styles from './PriceComponent.module.css'
import CustomNameInput from '../CustomNameInput/CustomNameInput'
import CustomButton from '../CustomButton/CustomButton'
import exitImg from '../../assets/icons/exit.svg'

type PriceComponentPropsType = {
  // onChangeNameOfTicketHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  // onChangeCountOfTicketHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type PricesType = {
  name: string
  value: string
}

const PriceComponent: FC<PriceComponentPropsType> = () => {
  const [prices, setPrices] = useState<PricesType[]>([{ name: '', value: '' }])

  console.log(prices)

  const addOnePointHandler = () => {
    const newPrice = {
      name: '',
      value: '',
    }

    setPrices([...prices, newPrice])
  }

  const addDeletePointHandler = () => {
    const newArray = [...prices.filter((el, i) => i !== prices.length - 1)]

    setPrices(newArray)
  }

  const onChangeNameOfTicketHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setPrices(
      prices.map((price, ind) =>
        index === ind
          ? {
              ...price,
              name: e.target.value,
            }
          : { ...price },
      ),
    )
  }

  const onChangeCountOfTicketHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setPrices(
      prices.map((price, ind) =>
        index === ind
          ? {
            ...price,
            value: e.target.value,
          }
          : { ...price },
      ),
    )
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
              callbackHandler={(e) => onChangeNameOfTicketHandler(e, index)}
            />
            <CustomNameInput
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

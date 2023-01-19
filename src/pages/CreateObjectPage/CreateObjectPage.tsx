import React, { useState } from 'react'
import styles from './CreateObjectPage.module.css'
import CustomInput from '../../components/CustomInput/CustomInput'

const categories = [
  {
    id: 1,
    name: 'Достопримечательности',
    subCategories: [
      { id: 7, name: 'Культурные достопримечательности' },
      { id: 8, name: 'Природные достопримечательности' },
    ],
  },
  {
    id: 2,
    name: ' Активный отдых',
    subCategories: [
      { id: 16, name: 'Рафтинг' },
      { id: 17, name: 'Конные прогулки' },
      { id: 18, name: 'Квадроциклы' },
      { id: 19, name: 'Джимпинг' },
      { id: 20, name: 'Экстрим' },
      { id: 21, name: 'Зимний отдых' },
    ],
  },
  {
    id: 4,
    name: 'Места отдыха',
    subCategories: [
      { id: 22, name: 'Термальные источники' },
      { id: 23, name: 'Бани' },
      { id: 24, name: 'Бассейны ' },
      { id: 25, name: 'Место для пикника' },
    ],
  },
  {
    id: 5,
    name: 'Проживание',
    subCategories: [
      { id: 9, name: 'Отели' },
      { id: 10, name: 'Базы отдыха' },
      { id: 11, name: 'Глэмпинги' },
      { id: 12, name: 'Кемпинги' },
    ],
  },
  {
    id: 6,
    name: 'Питание',
    subCategories: [
      { id: 13, name: 'Рестораны' },
      { id: 14, name: 'Кафе' },
      { id: 15, name: 'Магазины' },
    ],
  },
]

const CreateObjectPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(1)
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className={styles.object}>
      <div className={styles.container}>
        <h1 className={styles.title}>Создать объект</h1>
        <div className={styles.content}>
          <div className={styles.objectNameContainer}>
            <h4 className={styles.objectNameTitle}>Название объекта</h4>
            <CustomInput placeholder='Введите название объекта' type='text' />
          </div>
          <div className={styles.objectCoordinatesContainer}>
            <h4 className={styles.objectCoordinatesTitle}>Координаты объекта</h4>
            <div className={styles.allCoordinatesBlock}>
              <div className={styles.coordinatesBlock}>
                <p className={styles.coordinatesTitle}>Широта</p>
                <CustomInput placeholder='Введите широту' type='number' />
              </div>
              <div className={styles.coordinatesBlock}>
                <p className={styles.coordinatesTitle}>Долгота</p>
                <CustomInput placeholder='Введите широту' type='number' />
              </div>
            </div>
          </div>
          <div className={styles.categoriesBlock}>
            <h4 className={styles.categoriesTitle}>Выбрать категорию объекта</h4>
            <div className={styles.categoriesContainer}>
              {categories.map((category) => {
                const onActiveCategory = () => {
                  setActiveCategoryId(category.id)
                  setActiveCategory(categories.indexOf(category))
                }
                return (
                  <div
                    key={category.id}
                    className={
                      activeCategoryId === category.id
                        ? `${styles.categoryBlock} ${styles.activeCategoryBlock}`
                        : styles.categoryBlock
                    }
                    onClick={onActiveCategory}
                  >
                    <p
                      className={
                        activeCategoryId === category.id
                          ? `${styles.categoryName} ${styles.activeCategoryName}`
                          : styles.categoryName
                      }
                    >
                      {category.name}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.subCategoriesBlock}>
            <h4 className={styles.categoriesTitle}>Выбрать подкатегорию объекта</h4>
            <div className={styles.categoriesContainer}>
              {categories[activeCategory].subCategories.map((subcategory) => {
                const onActiveSubCategory = () => {
                  setActiveSubCategoryId(subcategory.id)
                }
                return (
                  <div
                    key={subcategory.id}
                    className={
                      activeSubCategoryId === subcategory.id
                        ? `${styles.categoryBlock} ${styles.activeCategoryBlock}`
                        : styles.categoryBlock
                    }
                    onClick={onActiveSubCategory}
                  >
                    <p
                      className={
                        activeSubCategoryId === subcategory.id
                          ? `${styles.categoryName} ${styles.activeCategoryName}`
                          : styles.categoryName
                      }
                    >
                      {subcategory.name}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateObjectPage

import React, { useState } from 'react'
import styles from './CreateObjectPage.module.css'
import main from '../../style/common.module.css'
import CustomNameInput from '../../components/CustomNameInput/CustomNameInput'
import CustomDoubleInputComponent from '../../components/CustomDoubleInputComponent/CustomDoubleInputComponent'
import UploadPhotoComponent from '../../components/UploadPhotoComponent/UploadPhotoComponent'
import UploadVideoComponent from '../../components/UploadVideoComponent/UploadVideoComponent'
import UploadAudioComponent from '../../components/UploadAudioComponent/UploadAudioComponent'
import UploadDescriptionComponent from '../../components/UploadDescriptionComponent/UploadDescriptionComponent'
import TimeTable from '../../components/TimeTable/TimeTable'
import ContactsComponent from '../../components/ContactsComponent/ContactsComponent'

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
      <div className={main.container}>
        <h1 className={main.title}>Создать объект</h1>
        <div className={styles.content}>
          <CustomNameInput
            name='Название объекта'
            placeholder='Введите название объекта'
            type='text'
          />
          <CustomNameInput name='Адрес объекта' placeholder='Введите адрес объекта' type='text' />
          <CustomDoubleInputComponent
            name='Координаты объекта'
            firstPlaceholder='Введите широту'
            secondPlaceholder='Введите долготу'
            firstSubTitle='Широта'
            secondSubTitle='Долгота'
            type='text'
          />
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
          <div className={styles.uploadMediaContainer}>
            <h2 className={styles.uploadMediaTitle}>Загрузить медиа файлы</h2>
            <UploadPhotoComponent />
            <UploadVideoComponent />
            <UploadAudioComponent />
            <UploadDescriptionComponent placeholder='' title='Описание' />
            <TimeTable />
            <ContactsComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateObjectPage

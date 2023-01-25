import React from 'react'
import styles from './Waypoints.module.css'
import SearchFunctionalityComponent from '../SearchFunctionalityComponent/SearchFunctionalityComponent'
import CustomInput from '../CustomInput/CustomInput'
import SubmitButton from '../SubmitButton/SubmitButton'

const Waypoints = () => {
  return (
    <div className={styles.waypoints}>
      <h4 className={styles.waypointsTitle}>Маршрут</h4>
      <div className={styles.waypointMarginSearch}>
        <SearchFunctionalityComponent />
      </div>
      <div className={styles.waypointContainer}>
        <div className={styles.waypointBlock}>
          <div className={styles.waypointText}>Точка 1</div>
          <div className={styles.waypointInputName}>
            <CustomInput placeholder='Введите название' type='text' />
          </div>
          <div className={styles.waypointInput}>
            <CustomInput placeholder='Введите широту' type='text' />
          </div>
          <div className={styles.waypointInput}>
            <CustomInput placeholder='Введите долготу' type='text' />
          </div>
        </div>
        <div className={styles.waypointBlock}>
          <div className={styles.waypointText}>Точка 2</div>
          <div className={styles.waypointInputName}>
            <CustomInput placeholder='Введите название' type='text' />
          </div>
          <div className={styles.waypointInput}>
            <CustomInput placeholder='Введите широту' type='text' />
          </div>
          <div className={styles.waypointInput}>
            <CustomInput placeholder='Введите долготу' type='text' />
          </div>
        </div>
        <div className={styles.waypointBlock}>
          <div className={styles.waypointText}>Точка 3</div>
          <div className={styles.waypointInputName}>
            <CustomInput placeholder='Введите название' type='text' />
          </div>
          <div className={styles.waypointInput}>
            <CustomInput placeholder='Введите широту' type='text' />
          </div>
          <div className={styles.waypointInput}>
            <CustomInput placeholder='Введите долготу' type='text' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Waypoints

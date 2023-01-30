import React, { useState } from 'react'
import styles from './Waypoints.module.css'
import CustomInput from '../CustomInput/CustomInput'

const Waypoints = () => {
  const [waypoints, setWaypoints] = useState([
    { id: 1, name: '', latitude: '', longitude: '', description: '', audio: '' },
  ])

  const addWaypointHandler = (id: number) => {
    const newWaypoint = {
      id: id + 1,
      name: '',
      latitude: '',
      longitude: '',
      description: '',
      audio: '',
    }
    setWaypoints([...waypoints, newWaypoint])
  }

  return (
    <div className={styles.waypoints}>
      <h4 className={styles.waypointsTitle}>Маршрут</h4>
      <div className={styles.waypointContainer}>
        {waypoints.map((point, index) => {
          return (
            <>
              <div key={index} className={styles.waypointBlock}>
                <div className={styles.waypointText}>Точка {point.id}</div>
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
              <button onClick={() => addWaypointHandler(point.id)}>Добавить</button>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Waypoints

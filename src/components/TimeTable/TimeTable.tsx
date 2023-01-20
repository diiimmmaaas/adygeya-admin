import React from 'react'
import styles from './TimeTable.module.css'

const days = [
  { id: 1, name: 'Понедельник' },
  { id: 2, name: 'Вторник' },
  { id: 3, name: 'Среда' },
  { id: 4, name: 'Четверг' },
  { id: 5, name: 'Пятница' },
  { id: 6, name: 'Суббота' },
  { id: 7, name: 'Воскресение' },
]

const TimeTable = () => {
  return (
    <div className={styles.timeTableContainer}>
      <h4 className={styles.timeTableTitle}>Расписание</h4>
      <div className={styles.scheduleContainer}>
        <div className={styles.daysBlock}>
          <div className={styles.titleBlock}>
            <h5 className={styles.daysTitle}>Дни недели</h5>
            <div className={styles.timeTitleContainer}>
              <h5 className={styles.timeTitle}>Время</h5>
            </div>
          </div>

          {days.map((day) => {
            return (
              <div className={styles.dayContainer} key={day.id}>
                <div className={styles.dayName}>{day.name}</div>
                <div className={styles.timeContainer}>
                  <input className={styles.input} type='text' />
                  <p className={styles.dash}>-</p>
                  <input className={styles.input} type='text' />
                  <input className={styles.checkbox} type='checkbox' />
                  <div className={styles.dayOff}>Выходной</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.timeBlock}></div>
      </div>
    </div>
  )
}

export default TimeTable

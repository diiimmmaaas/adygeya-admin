import React from 'react'
import styles from './TimeTable.module.css'

const days = [
  { weekday: 0, name: 'Понедельник' },
  { weekday: 1, name: 'Вторник' },
  { weekday: 2, name: 'Среда' },
  { weekday: 3, name: 'Четверг' },
  { weekday: 4, name: 'Пятница' },
  { weekday: 5, name: 'Суббота' },
  { weekday: 6, name: 'Воскресение' },
]

type TimeTablePropsType = {
  onOpenChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, weekday: number) => void
  onCloseChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, weekday: number) => void
}

const TimeTable: React.FC<TimeTablePropsType> = ({ onOpenChangeHandler, onCloseChangeHandler }) => {
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
              <div className={styles.dayContainer} key={day.weekday}>
                <div className={styles.dayName}>{day.name}</div>
                <div className={styles.timeContainer}>
                  <input
                    className={styles.input}
                    type='text'
                    onChange={(e) => onOpenChangeHandler(e, day.weekday)}
                  />
                  <p className={styles.dash}>-</p>
                  <input
                    className={styles.input}
                    type='text'
                    onChange={(e) => onCloseChangeHandler(e, day.weekday)}
                  />
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

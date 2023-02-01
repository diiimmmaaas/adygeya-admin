import React from 'react'
import styles from './TimeTable.module.css'
import InputMask from 'react-input-mask'
import { ScheduleType } from '../../redux/types/types'
import { createDayOfWeek } from '../../utils/createDayOfWeek'

type TimeTablePropsType = {
  schedule: ScheduleType[]
  onOpenChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, weekday: number) => void
  onCloseChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, weekday: number) => void
}

const TimeTable: React.FC<TimeTablePropsType> = ({
  schedule,
  onOpenChangeHandler,
  onCloseChangeHandler,
}) => {
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

          {schedule.map((day) => {
            return (
              <div className={styles.dayContainer} key={day.weekday}>
                <div className={styles.dayName}>{createDayOfWeek(day.weekday)}</div>
                <div className={styles.timeContainer}>
                  <InputMask
                    value={day.open}
                    mask='99:99'
                    placeholder='00:00'
                    className={styles.input}
                    type='text'
                    onChange={(e) => onOpenChangeHandler(e, day.weekday)}
                  />
                  <p className={styles.dash}>-</p>
                  <InputMask
                    value={day.close}
                    mask='99:99'
                    placeholder='00:00'
                    className={styles.input}
                    type='text'
                    onChange={(e) => onCloseChangeHandler(e, day.weekday)}
                  />
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

export default React.memo(TimeTable)

import React from 'react'
import styles from './SettingsPage.module.css'
import main from '../../style/common.module.css'

const SettingsPage = () => {
  return (
    <div className={styles.settingsPageContainer}>
      <div className={main.container}>
        <h1 className={main.title}>Настройки</h1>
        <div className={styles.content}></div>
      </div>
    </div>
  )
}

export default SettingsPage

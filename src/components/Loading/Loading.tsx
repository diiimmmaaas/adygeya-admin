import React from 'react'

import styles from './Loading.module.css'
import { Bars } from 'react-loader-spinner'

export const Loading = () => (
  <div className={styles.loader}>
    <Bars
      height='80'
      width='80'
      color='#028959'
      ariaLabel='bars-loading'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
    />
  </div>
)

export default Loading

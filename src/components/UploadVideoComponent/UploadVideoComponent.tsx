import React, { ChangeEvent, useState } from 'react'
import styles from './UploadVideoComponent.module.css'
import CustomButton from '../CustomButton/CustomButton'
import exit from '../../assets/icons/exit.svg'

export type FileType = {
  name: string
  type: string
  size: string
  src: string
}

const UploadVideoComponent = () => {
  const [videos, setVideos] = useState<FileType[]>([])
  const [highlight, setHighlight] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    handFiles(files)
  }

  const handFiles = (files: any) => {
    const videosArr: {
      name: string
      type: string
      size: string
      src: string
    }[] = []
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        const fileObj = {
          name: file.name as string,
          type: file.type as string,
          size: file.size as string,
          src: reader.result as string,
        }
        videosArr.push(fileObj)
        setVideos([...videos, ...videosArr])
      })
    }
  }

  const handleDelete = (e: any) => {
    const target = e.target.parentElement
    const targetIndex = e.target.dataset.videoindex * 1
    setVideos([...videos.slice(0, targetIndex), ...videos.slice(targetIndex + 1)])
  }

  const handleHighlight = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(true)
  }
  const handleUnHighlight = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
  }
  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    const dt = e.dataTransfer
    const files = dt.files
    setHighlight(false)
    handFiles(files)
  }

  return (
    <div className={styles.uploadVideoContainer}>
      <h4 className={styles.uploadVideoText}>Видео</h4>
      <div className={styles.uploadVideoBoard}>
        <input
          className={styles.inputFile}
          type='file'
          name='videos'
          placeholder='Добавьте видео'
          multiple
          id='filevideos'
          onChange={handleFileChange}
          accept='video/*'
        />
        {videos.length > 0 &&
          videos.map((video, index) => {
            return (
              <div className={styles.videosContainer} key={index} data-videoindex={index}>
                <img
                  className={styles.videoExit}
                  src={exit}
                  alt='exit'
                  onClick={handleDelete}
                  data-videoindex={index}
                />
                <video width='400' controls className={styles.videoPlayer}>
                  <source src={video.src} />
                </video>
              </div>
            )
          })}
        <label
          className={highlight ? `${styles.label} ${styles.activeLabel}` : styles.label}
          htmlFor='filevideos'
          onDragEnter={handleHighlight}
          onDragOver={handleHighlight}
          onDragLeave={handleUnHighlight}
          onDrop={handleDrop}
        >
          Добавьте видео
        </label>
      </div>
      <div className={styles.btnContainer}>
        <CustomButton name='Загрузить видео' />
      </div>
    </div>
  )
}

export default UploadVideoComponent

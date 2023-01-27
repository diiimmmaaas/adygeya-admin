import React, { ChangeEvent, useState } from 'react'
import styles from './UploadAudioComponent.module.css'
import exit from '../../assets/icons/exit.png'
import { FileType } from '../../pages/CreateObjectPage/CreateObjectPage'

type UploadAudioComponentPropsType = {
  setAudioFiles: (audioFiles: any) => void
}

const UploadAudioComponent: React.FC<UploadAudioComponentPropsType> = ({ setAudioFiles }) => {
  const [audio, setAudio] = useState<FileType[]>([])
  const [highlight, setHighlight] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    // @ts-ignore
    setAudioFiles([...files])
    handFiles(files)
  }

  const handFiles = (files: any) => {
    const audioArr: {
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
        audioArr.push(fileObj)
        setAudio([...audio, ...audioArr])
      })
    }
  }

  const handleDelete = (e: any) => {
    const target = e.target.parentElement
    const targetIndex = e.target.dataset.audioindex * 1
    setAudio([...audio.slice(0, targetIndex), ...audio.slice(targetIndex + 1)])
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
    <div className={styles.uploadAudioContainer}>
      <h4 className={styles.uploadAudioText}>Аудио</h4>
      <div className={styles.uploadAudioBoard}>
        <input
          className={styles.inputFile}
          type='file'
          name='audio'
          placeholder='Добавьте аудио'
          id='fileaudio'
          onChange={handleFileChange}
          accept='audio/*'
        />
        {audio.length > 0 &&
          audio.map((a, index) => {
            return (
              <div className={styles.audioContainer} key={index} data-audioindex={index}>
                <video width='400' controls className={styles.audioPlayer}>
                  <source src={a.src} />
                </video>
                <div className={styles.exitContainer}>
                  <img
                    className={styles.audioExit}
                    src={exit}
                    alt='exit'
                    onClick={handleDelete}
                    data-audioindex={index}
                  />
                </div>
              </div>
            )
          })}
        <label
          className={highlight ? `${styles.label} ${styles.activeLabel}` : styles.label}
          htmlFor='fileaudio'
          onDragEnter={handleHighlight}
          onDragOver={handleHighlight}
          onDragLeave={handleUnHighlight}
          onDrop={handleDrop}
        >
          Добавьте аудио
        </label>
      </div>
    </div>
  )
}

export default React.memo(UploadAudioComponent)

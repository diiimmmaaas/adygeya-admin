import React, { ChangeEvent, useState } from 'react'
import styles from './UploadPhotoComponent.module.css'
import exit from '../../assets/icons/exit.svg'
import { FileType } from '../UploadVideoComponent/UploadVideoComponent'

type UploadPhotoComponentPropsType = {
  photos: FileType[]
  setPhotos: (photos: FileType[]) => void
}

const UploadPhotoComponent: React.FC<UploadPhotoComponentPropsType> = ({ photos, setPhotos }) => {
  const [highlight, setHighlight] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    handFiles(files)
  }

  const handFiles = (files: any) => {
    const photosArr: {
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
        photosArr.push(fileObj)
        setPhotos([...photos, ...photosArr])
      })
    }
  }

  const handleDelete = (e: any) => {
    const target = e.target.parentElement
    const targetIndex = e.target.dataset.imgindex * 1
    setPhotos([...photos.slice(0, targetIndex), ...photos.slice(targetIndex + 1)])
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
    <div className={styles.uploadPhotoContainer}>
      <h4 className={styles.uploadPhotoText}>Фото</h4>
      <div className={styles.uploadPhotoBoard}>
        <input
          className={styles.inputFile}
          type='file'
          name='photos'
          placeholder='Добавьте картинки'
          multiple
          id='filephotos'
          onChange={handleFileChange}
          accept='image/*'
        />
        {photos.length > 0 &&
          photos.map((photo, index) => {
            return (
              <div className={styles.imagesContainer} key={index} data-imgindex={index}>
                <img
                  className={styles.imageExit}
                  src={exit}
                  alt='exit'
                  onClick={handleDelete}
                  data-imgindex={index}
                />
                <img className={styles.image} src={photo.src} alt={photo.name} />
              </div>
            )
          })}
        <label
          className={highlight ? `${styles.label} ${styles.activeLabel}` : styles.label}
          htmlFor='filephotos'
          onDragEnter={handleHighlight}
          onDragOver={handleHighlight}
          onDragLeave={handleUnHighlight}
          onDrop={handleDrop}
        >
          Добавьте фото
        </label>
      </div>
    </div>
  )
}

export default React.memo(UploadPhotoComponent)

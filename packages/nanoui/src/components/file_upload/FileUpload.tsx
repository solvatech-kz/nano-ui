'use client'
import {DragEvent, ChangeEvent, type FC, useCallback, useMemo, useState} from 'react'
import styles from './FileUpload.module.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {config} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faFileUpload,
  faFilePdf,
  faFileImage,
  faTimes,
  faFileAudio,
  faFileVideo
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

export interface FileUploadProps {
  value?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
}

export const FileUpload: FC<FileUploadProps> = ({value, onChange, accept, multiple}) => {
  const [internalFiles, setInternalFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const files = value !== undefined ? value : internalFiles

  const updateFiles = useCallback(
    (newFiles: File[]) => {
      if (value === undefined) {
        setInternalFiles(newFiles)
      }
      onChange?.(newFiles)
    },
    [value, onChange]
  )

  const isFileAccepted = useCallback(
    (file: File) => {
      if (!accept) return true
      const acceptedTypes = accept.split(',').map((t) => t.trim())
      return acceptedTypes.some((type) => {
        if (type === 'image/*') return file.type.startsWith('image/')
        if (type === 'video/*') return file.type.startsWith('video/')
        if (type === 'audio/*') return file.type.startsWith('audio/')
        return file.type === type || file.name.toLowerCase().endsWith(type.toLowerCase())
      })
    },
    [accept]
  )

  const dedupeFiles = useCallback(
    (list: File[]) => list.filter((f, i, arr) => arr.findIndex((x) => x.name === f.name && x.size === f.size) === i),
    []
  )

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || []).filter(isFileAccepted)
      if (!selected.length) return
      const newFiles = multiple ? dedupeFiles([...files, ...selected]) : [selected[0]]
      updateFiles(newFiles)
    },
    [files, isFileAccepted, dedupeFiles, multiple, updateFiles]
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      const dropped = Array.from(e.dataTransfer.files).filter(isFileAccepted)
      if (!dropped.length) return
      const newFiles = multiple ? dedupeFiles([...files, ...dropped]) : [dropped[0]]
      updateFiles(newFiles)
    },
    [files, isFileAccepted, dedupeFiles, multiple, updateFiles]
  )

  const removeFile = useCallback(
    (file: File) => {
      updateFiles(files.filter((f) => f !== file))
    },
    [files, updateFiles]
  )

  const formatSize = useCallback((size: number) => {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / (1024 * 1024)).toFixed(1)} MB`
  }, [])

  const getFileIcon = useCallback((file: File) => {
    if (file.type === 'application/pdf') {
      return <FontAwesomeIcon aria-hidden="true" icon={faFilePdf} className={styles.file__icon} />
    }
    if (file.type.startsWith('image/')) {
      return <FontAwesomeIcon aria-hidden="true" icon={faFileImage} className={styles.file__icon} />
    }
    if (file.type.startsWith('audio/')) {
      return <FontAwesomeIcon aria-hidden="true" icon={faFileAudio} className={styles.file__icon} />
    }
    if (file.type.startsWith('video/')) {
      return <FontAwesomeIcon aria-hidden="true" icon={faFileVideo} className={styles.file__icon} />
    }
    return <FontAwesomeIcon aria-hidden="true" icon={faFileUpload} className={styles.file__icon} />
  }, [])

  const truncateFileName = (name: string, maxLength = 20) => {
    const parts = name.split('.')
    if (parts.length < 2) return name.length > maxLength ? name.slice(0, maxLength) + '…' : name

    const ext = parts.pop() as string
    const base = parts.join('.')

    if (base.length > maxLength) {
      return base.slice(0, maxLength) + '… .' + ext
    }
    return base + '.' + ext
  }

  const fileList = useMemo(
    () =>
      files.map((file) => (
        <li key={file.name + file.size} className={styles.file__item}>
          {getFileIcon(file)}
          <div className={styles.file__text}>
            <span title={file.name}>{truncateFileName(file.name)}</span>
            <p>{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            className={styles.remove__btn}
            onClick={() => removeFile(file)}
            aria-label={`Remove file ${file.name}`}
          >
            <FontAwesomeIcon aria-hidden="true" icon={faTimes} />
          </button>
        </li>
      )),
    [files, getFileIcon, formatSize, removeFile]
  )

  return (
    <section
      className={`${styles.root} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDragOver(false)
      }}
      onDrop={handleDrop}
      aria-label="File upload"
      role="region"
    >
      <label
        htmlFor="file-upload-input"
        className={styles.label}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            document.getElementById('file-upload-input')?.click()
          }
        }}
      >
        <FontAwesomeIcon aria-hidden="true" className={styles.file__icon} icon={faFileUpload} />
        <p>
          <strong className={styles.file__button}>Click to upload</strong> or drag and drop
        </p>
        <p>
          Supported: {accept || 'any'} {multiple ? '(multiple)' : ''}
        </p>
      </label>

      <input
        id="file-upload-input"
        className={styles.input}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />

      {files.length > 0 && (
        <ul className={styles.file__list} aria-live="polite">
          {fileList}
        </ul>
      )}
    </section>
  )
}

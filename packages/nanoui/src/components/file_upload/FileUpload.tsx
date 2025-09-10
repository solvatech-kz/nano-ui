'use client'
import {DragEvent, ChangeEvent, FC, useCallback, useMemo, useState} from 'react'
import styles from './FileUpload.module.css'
import {truncateFileName, formatSize} from './file'

export interface FileUploadProps {
  value?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
}

export const FileUpload: FC<FileUploadProps> = ({value, onChange, accept, multiple}) => {
  const [internalFiles, setInternalFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const files = value ?? internalFiles

  const updateFiles = useCallback(
    (newFiles: File[]) => {
      if (!value) setInternalFiles(newFiles)
      onChange?.(newFiles)
    },
    [value, onChange]
  )

  const isFileAccepted = useCallback(
    (file: File) => {
      if (!accept) return true

      const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase())

      return acceptedTypes.some((type) => {
        if (type.endsWith('/*')) {
          const base = type.replace('/*', '')
          return file.type.toLowerCase().startsWith(base + '/')
        }

        if (file.type.toLowerCase() === type) {
          return true
        }

        return file.name.toLowerCase().endsWith(type)
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
      updateFiles(files.filter((f) => !(f.name === file.name && f.size === file.size)))
    },
    [files, updateFiles]
  )

  const fileList = useMemo(
    () =>
      files.map((file) => (
        <li key={file.name + file.size} className={styles.file__item}>
          <img aria-hidden="true" alt="File icon" className={styles.file__icon} src="/file.svg" />
          <div className={styles.file__text}>
            <span title={file.name}>{truncateFileName(file.name)}</span>
            <p>{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            className={styles.remove__btn}
            onClick={() => removeFile(file)}
            aria-label={`Remove file ${file.name}`}
          />
        </li>
      )),
    [files, removeFile]
  )

  return (
    <section
      className={`${styles.root} ${isDragOver ? styles.dragOver : ''} ${files.length > 0 ? styles.hasFiles : ''}`}
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
        <img aria-hidden="true" alt="File icon" className={styles.file__icon} src="./file.svg" />
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

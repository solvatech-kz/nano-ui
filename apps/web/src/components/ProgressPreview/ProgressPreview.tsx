'use client'

import {Progress} from '@nanoui/core'
import {type FC, useState} from 'react'
import styles from './ProgressPreview.module.css'

export const ProgressPreview: FC = () => {
  const [value, setValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(100)

  return (
    <>
      <input
        type="text"
        className={styles.input}
        defaultValue={value}
        placeholder="Progress value..."
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <input
        type="text"
        className={styles.input}
        defaultValue={maxValue}
        placeholder="Max value..."
        onChange={(e) => setMaxValue(Number(e.target.value))}
      />
      <p>Small</p>
      <Progress value={value} size="sm" max={maxValue} className={styles.progress} />
      <p>Medium</p>
      <Progress value={value} max={maxValue} className={styles.progress} />
      <p>Large</p>
      <Progress value={value} size="lg" max={maxValue} className={styles.progress} />
    </>
  )
}

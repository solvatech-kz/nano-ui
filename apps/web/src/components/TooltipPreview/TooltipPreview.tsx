'use client'

import {Tooltip} from '@nanoui/core'
import {Button} from '@nanoui/core'
import {useEffect, useRef, useState} from 'react'
import styles from './TooltipPreview.module.css'

const positions = ['top', 'bottom', 'left', 'right'] as const
type Position = (typeof positions)[number]

export const TooltipPreview = () => {
  const [position, setPosition] = useState<Position>('top')
  const [dummy, setDummy] = useState<boolean>(false)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (innerRef.current) setDummy(!dummy)
  }, [])

  return (
    <>
      <select
        className={styles.input}
        defaultValue={position}
        onChange={(e) => setPosition(e.target.value as Position)}
      >
        {positions.map((v) => (
          <option key={v} value={v}>
            {v[0].toUpperCase() + v.slice(1)}
          </option>
        ))}
      </select>
      <div
        ref={innerRef}
        style={{
          // position: 'relative',
          width: 'fit-content'
        }}
      >
        <Tooltip content={<>Example</>} position={position} container={innerRef.current ?? undefined}>
          <span>Hover or focus on me to display additional info</span>
        </Tooltip>
      </div>
    </>
  )
}

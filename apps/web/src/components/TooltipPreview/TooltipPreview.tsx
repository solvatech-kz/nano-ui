'use client'

import {Tooltip} from '@nanoui/core'
import {useId, useRef, useState} from 'react'
import styles from './TooltipPreview.module.css'

const positions = ['top', 'bottom', 'left', 'right'] as const
type Position = (typeof positions)[number]

export const TooltipPreview = () => {
  const [position, setPosition] = useState<Position>('top')
  const [visible, setVisible] = useState<number>(0)
  const innerRef = useRef<HTMLDivElement>(null)
  const positionInputId = useId()
  const visibleInputId = useId()

  return (
    <>
      <label htmlFor={positionInputId}>Position: </label>
      <select
        id={positionInputId}
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
      <label htmlFor={visibleInputId}>Visible: </label>
      <select className={styles.input} defaultValue={undefined} onChange={(e) => setVisible(Number(e.target.value))}>
        <option value={0}>Unset</option>
        <option value={1}>Yes</option>
        <option value={2}>No</option>
      </select>
      <div ref={innerRef} />
      <Tooltip
        content={<>You can display any React node here!</>}
        position={position}
        container={innerRef.current ?? undefined}
        isVisible={[undefined, true, false][visible]}
      >
        <span>Hover or focus on me to display additional info</span>
      </Tooltip>
    </>
  )
}

'use client'

import {type FC, type CSSProperties, type ReactElement, type ReactNode, useRef, useEffect, useState, useId} from 'react'
import {createPortal} from 'react-dom'
import styles from './Tooltip.module.css'

interface TooltipProps {
  content: string | ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
  container?: HTMLElement
  isVisible?: boolean
  className?: string
  style?: CSSProperties
  children: ReactElement
}

const Tooltip: FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 300,
  container,
  isVisible,
  className,
  style,
  children
}) => {
  const anchorRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [positionStyle, setPositionStyle] = useState<typeof position>(position)
  const [containerState, setContainerState] = useState<HTMLElement | undefined>(container)
  const [visible, setVisible] = useState(false)
  const [definedPosition, setDefinedPosition] = useState(false)
  const classNames = [
    className,
    styles.tooltip,
    styles[positionStyle],
    definedPosition ? styles.visible : styles.hidden
  ]
    .join(' ')
    .trim()
  const tooltipId = useId()

  const getOffset = () => {
    if (tooltipRef.current) {
      const tooltipStyle = window.getComputedStyle(tooltipRef.current)
      return (
        16 *
        (parseFloat('0' + tooltipStyle.getPropertyValue('--tooltip-spike-size')) +
          parseFloat('0' + tooltipStyle.getPropertyValue('--tooltip-margin')))
      )
    } else return 0
  }

  useEffect(() => {
    setContainerState(container ?? document.body)
  }, [container])

  useEffect(() => {
    setPositionStyle(position)
  }, [position])

  useEffect(() => {
    setVisible((v) => isVisible ?? v)
  }, [isVisible])

  useEffect(() => {
    if (visible) {
      const calcPlacement = () => {
        const anchorRect = anchorRef.current?.getBoundingClientRect()
        const tooltipRect = tooltipRef.current?.getBoundingClientRect()
        const height = tooltipRect ? tooltipRect['height'] + getOffset() : null
        const width = tooltipRect ? tooltipRect['width'] + getOffset() : null

        if (anchorRect && height && width) {
          const positionMods: Record<
            typeof position,
            {
              switchCondition: () => boolean
              toPosition: typeof position
            }
          > = {
            top: {
              switchCondition: () => height > anchorRect[position],
              toPosition: 'bottom'
            },
            bottom: {
              switchCondition: () => height > window.innerHeight - anchorRect[position],
              toPosition: 'top'
            },
            left: {
              switchCondition: () => width > anchorRect[position],
              toPosition: 'right'
            },
            right: {
              switchCondition: () => width > window.innerWidth - anchorRect[position],
              toPosition: 'left'
            }
          }
          if (positionMods[position].switchCondition()) return positionMods[position].toPosition
          else return position
        }
      }

      const finalPosition = calcPlacement()
      setPositionStyle(finalPosition!)
      let anchorRect = anchorRef.current?.getBoundingClientRect()
      let tooltipRect = tooltipRef.current?.getBoundingClientRect()
      if (anchorRef.current && tooltipRef.current && anchorRect && tooltipRect) {
        let x = anchorRect.left,
          y = anchorRect.top
        let offsetParent = tooltipRef.current.offsetParent ?? document.documentElement
        if (window.getComputedStyle(offsetParent).position === 'static') {
          x += window.scrollX
          y += window.scrollY
        } else {
          const offsetRect = offsetParent.getBoundingClientRect()
          x -= offsetRect.left
          y -= offsetRect.top
        }

        const updatePosition = (x: number, y: number) => {
          if (tooltipRef.current) {
            tooltipRef.current.style.left = `${x}px`
            tooltipRef.current.style.top = `${y}px`
            tooltipRect = tooltipRef.current.getBoundingClientRect()
          }
        }

        switch (finalPosition) {
          case 'top':
            x = x + anchorRect.width / 2
            y = y - tooltipRect.height - getOffset()
            break
          case 'bottom':
            x = x + anchorRect.width / 2
            y = y + anchorRect.height + getOffset()
            break
          case 'left':
            x = x - tooltipRect.width - getOffset()
            y = y + anchorRect.height / 2
            break
          case 'right':
            x = x + anchorRect.width + getOffset()
            y = y + anchorRect.height / 2
            break
          default:
            break
        }
        updatePosition(x, y)
        x = x - (tooltipRect.left < 0 ? tooltipRect.left : 0)
        x = x - (tooltipRect.right > window.innerWidth ? tooltipRect.right - window.innerWidth : 0)
        y = y - (tooltipRect.top < 0 ? tooltipRect.top : 0)
        y = y - (tooltipRect.bottom > window.innerHeight ? tooltipRect.bottom - window.innerHeight : 0)
        updatePosition(x, y)
        tooltipRef.current.style.setProperty('--delay', `${delay}ms`)
        setDefinedPosition(true)
      } else {
        console.log('Error: Element not initialized')
      }
    } else {
      setDefinedPosition(false)
      tooltipRef.current?.style.removeProperty('--delay')
      setPositionStyle(() => position)
    }
  }, [position, delay, visible, isVisible])

  const showTooltip = () => {
    if (isVisible === undefined) setVisible(true)
  }

  const hideTooltip = () => {
    if (isVisible === undefined) {
      setVisible(false)
    }
  }

  return (
    <>
      <div
        aria-describedby={visible ? tooltipId : undefined}
        className={styles.anchor}
        ref={anchorRef}
        onMouseEnter={showTooltip}
        onFocus={showTooltip}
        onMouseLeave={hideTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
      >
        {children}
      </div>
      {containerState &&
        visible &&
        createPortal(
          <div
            aria-hidden={!visible}
            className={classNames}
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            style={style}

          >
            {content}
          </div>,
          containerState
        )}
    </>
  )
}

export {Tooltip}

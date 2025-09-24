'use client'

import {
  type FC,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  useRef,
  useEffect,
  useState,
  useId,
  useCallback
} from 'react'
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
  const classNames = [className, styles.tooltip, styles[positionStyle]].join(' ').trim()
  const tooltipId = useId()

  const visibleStyles = {
    transition: definedPosition ? `opacity 375ms ${delay}ms` : 'none',
    visibility: definedPosition ? 'visible' : 'hidden',
    opacity: definedPosition ? 1 : 0
  }
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
    if (container === undefined) setContainerState(document.body)
    else setContainerState(container)
  }, [container])

  useEffect(() => {
    setPositionStyle(position)
  }, [position])

  const calcPlacement = useCallback(() => {
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
  }, [position])

  useEffect(() => {
    if (isVisible !== undefined) setVisible(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (visible) {
      const finalPosition = calcPlacement()
      setPositionStyle(finalPosition!)
      let anchorRect = anchorRef.current?.getBoundingClientRect()
      let tooltipRect = tooltipRef.current?.getBoundingClientRect()
      if (anchorRef.current && tooltipRef.current && anchorRect && tooltipRect) {
        let x, y
        let offsetParent = tooltipRef.current.offsetParent ?? document.documentElement
        if (window.getComputedStyle(offsetParent).position === 'static') {
          x = anchorRect.left + window.scrollX
          y = anchorRect.top + window.scrollY
        } else {
          const offsetRect = offsetParent.getBoundingClientRect()
          x = anchorRect.left - offsetRect.left
          y = anchorRect.top - offsetRect.top
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
            updatePosition(x, y)
            y = y + (tooltipRect[finalPosition] < 0 ? tooltipRect[finalPosition] : 0)
            break
          case 'bottom':
            x = x + anchorRect.width / 2
            y = y + anchorRect.height + getOffset()
            updatePosition(x, y)
            y =
              y -
              (tooltipRect[finalPosition] > window.innerHeight ? tooltipRect[finalPosition] - window.innerHeight : 0)
            break
          case 'left':
            x = x - tooltipRect.width - getOffset()
            y = y + anchorRect.height / 2
            updatePosition(x, y)
            x = x + (tooltipRect[finalPosition] < 0 ? tooltipRect[finalPosition] : 0)
            break
          case 'right':
            x = x + anchorRect.width + getOffset()
            y = y + anchorRect.height / 2
            updatePosition(x, y)
            x =
              x - (tooltipRect[finalPosition] > window.innerWidth ? tooltipRect[finalPosition] - window.innerWidth : 0)
            break
          default:
            break
        }
        updatePosition(x, y)
        tooltipRef.current.style.right = 'auto'
        tooltipRef.current.style.bottom = 'auto'
        tooltipRef.current.setAttribute('aria-hidden', 'false')
        setDefinedPosition(true)
      } else {
        console.log('Error: Element not initialized')
      }
    } else {
      tooltipRef.current?.setAttribute('aria-hidden', 'true')
      setDefinedPosition(false)
    }
  }, [calcPlacement, delay, visible, isVisible])

  const showTooltip = () => {
    if (isVisible === undefined) setVisible(true)
  }

  const hideTooltip = () => {
    if (isVisible === undefined) {
      setVisible(false)
      setDefinedPosition(false)
      setPositionStyle(() => position)
    }
  }

  return (
    <>
      <div
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
        (visible || isVisible) &&
        createPortal(
          <div
            className={classNames}
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            style={{...visibleStyles, ...style} as CSSProperties}
          >
            {content}
          </div>,
          containerState
        )}
    </>
  )
}

export {Tooltip}

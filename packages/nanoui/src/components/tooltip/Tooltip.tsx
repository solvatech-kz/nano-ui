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
  const [visible, setVisible] = useState(false)
  const [containerState, setContainerState] = useState<HTMLElement | undefined>(container)
  const [finalPosition, setFinalPosition] = useState(position)
  const classNames = [className, styles.tooltip, styles[finalPosition]].join(' ')
  const tooltipId = useId()

  useEffect(() => {
    if (container === undefined) setContainerState(document.body)
    else setContainerState(container)
  }, [container])

  useEffect(() => {
    setFinalPosition(position)
    tooltipRef.current?.style.removeProperty('transform')
  }, [position])

  const visibleStyles =
    isVisible === undefined
      ? undefined
      : {
          visibility: isVisible ? 'visible' : 'hidden',
          opacity: isVisible ? 1 : 0
        }

  const calcPlacement = () => {
    const anchorRect = anchorRef.current?.getBoundingClientRect()
    const tooltipRect = tooltipRef.current?.getBoundingClientRect()
    const height = tooltipRect ? tooltipRect['height'] : null
    const width = tooltipRect ? tooltipRect['width'] : null

    if (anchorRect && height && width) {
      const positionMods: Record<
        typeof position,
        {
          switchCondition: boolean
          toPosition: typeof position
        }
      > = {
        top: {
          switchCondition: height > anchorRect[position],
          toPosition: 'bottom'
        },
        bottom: {
          switchCondition: height > window.innerHeight - anchorRect[position],
          toPosition: 'top'
        },
        left: {
          switchCondition: width > anchorRect[position],
          toPosition: 'right'
        },
        right: {
          switchCondition: width > window.innerWidth - anchorRect[position],
          toPosition: 'left'
        }
      }
      if (positionMods[position].switchCondition) setFinalPosition(() => positionMods[position].toPosition)
    }
  }

  const showTooltip = () => {
    setVisible(true)
    calcPlacement()
    let anchorRect = anchorRef.current?.getBoundingClientRect()
    let tooltipRect = tooltipRef.current?.getBoundingClientRect()
    if (anchorRect && tooltipRect && anchorRef.current && tooltipRef.current) {
      const offset =
        16 *
        (parseFloat('0' + window.getComputedStyle(tooltipRef.current).getPropertyValue('--tooltip-spike-size')) +
          parseFloat('0' + window.getComputedStyle(tooltipRef.current).getPropertyValue('--tooltip-margin')))
      let x = anchorRef.current.offsetLeft
      let y = anchorRef.current.offsetTop
      let offsetParent = anchorRef.current.offsetParent ?? document.body
      // console.log(offsetParent?.scrollLeft, ' ', offsetParent?.scrollTop)
      x = x + anchorRect.left
      switch (finalPosition) {
        case 'top':
          x = x + anchorRect.width / 2
          y = y - tooltipRect.height - offset
          break
        case 'bottom':
          x = x + anchorRect.width / 2
          y = y + anchorRect.height + offset
          break
        case 'left':
          x = x - tooltipRect.width - offset
          y = y + anchorRect.height / 2
          break
        case 'right':
          x = x + anchorRect.width + offset
          y = y + anchorRect.height / 2
          break
        default:
          break
      }
      tooltipRef.current.style.bottom = 'auto'
      tooltipRef.current.style.right = 'auto'
      tooltipRef.current.style.left = `${x}px`
      tooltipRef.current.style.top = `${y}px`
      tooltipRef.current.style.transition = `opacity 375ms ${delay}ms`
      tooltipRef.current.setAttribute('aria-hidden', 'false')
      if (isVisible === undefined) {
        tooltipRef.current.style.visibility = 'visible'
        tooltipRef.current.style.opacity = '1'
      }
    }
  }

  const hideTooltip = () => {
    setFinalPosition(() => position)
    tooltipRef.current?.style.removeProperty('transition')
    tooltipRef.current?.setAttribute('aria-hidden', 'true')
    if (isVisible === undefined) {
      tooltipRef.current?.style.setProperty('visibility', 'hidden')
      tooltipRef.current?.style.setProperty('opacity', '0')
      setVisible(false)
    }
  }

  return (
    <>
      <div
        className={styles.wrapper}
        ref={anchorRef}
        onMouseEnter={showTooltip}
        onFocus={showTooltip}
        onMouseLeave={hideTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
      >
        {children}
      </div>
      {containerState
        ? createPortal(
            visible ? (
              <div
                className={classNames}
                id={tooltipId}
                ref={tooltipRef}
                role="tooltip"
                style={{...style, ...visibleStyles} as CSSProperties}
              >
                {content}
              </div>
            ) : null,
            containerState
          )
        : null}
    </>
  )
}

export {Tooltip}

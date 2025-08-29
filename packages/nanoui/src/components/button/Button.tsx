import React, {useEffect, useRef, useState} from 'react'
import styles from './Button.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  autoResolveState?: boolean
  successIcon?: React.ReactNode
  errorIcon?: React.ReactNode
  loaderIcon?: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: (e: MouseEvent) => Promise<any> | void
  onMouseDown?: (e: MouseEvent) => void
  onTouchStart?: (e: TouchEvent) => void
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType
  className?: string
  style?: React.CSSProperties
  href?: string
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  autoResolveState = false,
  successIcon,
  errorIcon,
  loaderIcon,
  icon,
  iconPosition = 'left',
  onClick,
  onMouseDown,
  onTouchStart,
  as: Component = 'button',
  className,
  style,
  href = '#',
  children,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const timeoutId = useRef<number | null>(null)

  //TODO: handle type, change any
  const handleInteraction = (callback: ((e: any) => Promise<any> | void) | undefined, ...args: any) => {
    if (!callback) return

    if (autoResolveState) handleAutoResolve(callback)
    else callback(args.e)
  }

  const handleClearTimeout = () => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current)
      timeoutId.current = null
    }
  }

  //TODO: handle type, change any
  const handleAutoResolve = (fn: (...args: any) => any) => {
    handleClearTimeout()
    setIsLoading(true)

    fn()
      .then((response: any) => {
        setIsSuccess(true)
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => {
        timeoutId.current = setTimeout(() => {
          setIsLoading(false)
          setIsSuccess(false)
          setIsError(false)
        }, 2000)
      })
  }

  const buttonClassNames = () => {
    let returnClassName = `${styles['button-base']} ${styles[`button-${variant}`]} ${styles[`button-${size}`]}`
    if (disabled) returnClassName += ` ${styles[`button-disabled`]}`

    return className ? returnClassName + className : returnClassName
  }

  const ownProps = () => {
    //TODO: handle type, change any
    let returnProps: any = {
      onClick: (e: MouseEvent) => handleInteraction(onClick, e),
      onMouseDown: (e: MouseEvent) => handleInteraction(onMouseDown, e),
      onTouchStart: (e: TouchEvent) => handleInteraction(onTouchStart, e),
      disabled: disabled || loading || isLoading,
      ...props
    }

    if (Component !== 'button') {
      returnProps.role = 'button'
      returnProps.href = href
    }
    if (disabled || loading || isLoading) returnProps['aria-disabled'] = true

    return returnProps
  }

  const stateHandler = (
    state: boolean | React.ReactNode | undefined,
    icon: React.ReactNode,
    fallback?: React.ReactNode
  ) => {
    if (!state || (!icon && !fallback)) return null
    return (
      <div className={styles['button-state-wrapper']}>
        <div className={styles['button-state']}>{icon || fallback}</div>
      </div>
    )
  }

  useEffect(() => {
    return () => {
      handleClearTimeout()
    }
  }, [])

  return (
    <Component className={buttonClassNames()} style={style} {...ownProps()}>
      <>
        {isSuccess && stateHandler(isSuccess, successIcon, <span>Success</span>)}
        {isError && stateHandler(isError, errorIcon, <span>Error</span>)}
        {(!isSuccess || !isError || loading || isLoading) &&
          stateHandler(isSuccess, loaderIcon, <div className={styles['button-loader']} />)}
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition !== 'left' && icon}
      </>
    </Component>
  )
}

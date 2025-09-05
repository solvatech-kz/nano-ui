import {CSSProperties, FC, ReactNode, ElementType, ComponentPropsWithoutRef, PropsWithChildren} from 'react'
import styles from './Button.module.css'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonBaseProps<C extends ElementType> {
  as?: C
  autoResolveState?: boolean
  className?: string
  disabled?: boolean
  errorIcon?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  loaderIcon?: string
  loading?: boolean
  onClick?: (e: MouseEvent) => void
  onMouseDown?: (e: MouseEvent) => void
  onTouchStart?: (e: TouchEvent) => void
  size?: ButtonSize
  state?: 'loading' | 'success' | 'error'
  style?: CSSProperties
  successIcon?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
}

type ButtonProps<C extends ElementType> = PropsWithChildren<ButtonBaseProps<C>> &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonBaseProps<C>>

const DefaultLoader: FC = () => <div className={styles['button-loader']} />

const ButtonStateWrapper: FC<{children: ReactNode}> = ({children}) => (
  <div className={styles['button-state-wrapper']}>
    <div className={styles['button-state']}>{children}</div>
  </div>
)

const Icon: FC<{iconPath: string}> = ({iconPath}) => {
  if (!iconPath) return null
  return <img className={styles['button-icon']} src={iconPath} alt="" />
}

export const Button = <C extends ElementType = 'button'>({
  as,
  autoResolveState = false,
  children,
  className,
  disabled = false,
  errorIcon,
  icon,
  iconPosition = 'left',
  loaderIcon,
  loading = false,
  size = 'md',
  state,
  style,
  successIcon,
  variant = 'primary',
  ...props
}: ButtonProps<C>) => {
  const Component = as || 'button'

  const getClassName = () => {
    let returnClassName = `${styles['button-base']} ${styles[`button-${variant}`]} ${styles[`button-${size}`]}`
    if (disabled) returnClassName += ` ${styles[`button-disabled`]}`

    return className ? `${returnClassName} ${className}` : returnClassName
  }

  const ownProps = () => ({
    className: getClassName(),
    disabled: disabled || loading,
    style,
    ...props,
    ...(disabled || loading ? {'aria-disabled': true} : {}),
    ...(Component !== 'button' ? {role: 'button'} : {})
  })

  const renderState = () => {
    let icon: string | undefined, fallback: ReactNode

    switch (state) {
      case 'success':
        icon = successIcon
        fallback = <span>Success</span>
        break
      case 'error':
        icon = errorIcon
        fallback = <span>Error</span>
        break
      case 'loading':
        icon = loaderIcon
        fallback = <DefaultLoader />
        break
      default:
        return null
    }

    return <ButtonStateWrapper>{icon ? <Icon iconPath={icon} /> : fallback}</ButtonStateWrapper>
  }

  return (
    <Component {...ownProps()}>
      {loading && !state && (
        <ButtonStateWrapper>
          <DefaultLoader />
        </ButtonStateWrapper>
      )}
      {renderState()}
      {icon && iconPosition === 'left' && <Icon iconPath={icon} />}
      {children}
      {icon && iconPosition !== 'left' && <Icon iconPath={icon} />}
    </Component>
  )
}

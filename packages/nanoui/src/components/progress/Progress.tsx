import {type FC} from 'react'
import styles from './Progress.module.css'

interface ProgressProps {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
}

const Progress: FC<ProgressProps> = ({value, max = 100, size = 'md', className, style}) => {
  const allStyles: Array<string | undefined> = [styles['progress'], size ? styles[size] : undefined, className]
  const classNames: string = allStyles.filter((v) => v !== undefined).join(' ')
  const width: string = value ? Math.min(Math.floor((value / max) * 100), 100) + '%' : '0'

  return (
    <div
      className={classNames}
      style={{...style, ...{'--progress-value': width}}}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={value ? 0 : undefined}
      aria-valuemax={value ? max : undefined}
      aria-label={`Progress: ${value ? width : 'not set'}`}
    />
  )
}

export {Progress}

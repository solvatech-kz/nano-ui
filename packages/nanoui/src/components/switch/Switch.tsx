'use client'

import {type FC, useState, useCallback, CSSProperties } from 'react';
import styles from './Switch.module.css';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  locked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Switch: FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  locked = false,
  size='lg',
  onChange,
  disabled = false,
  className,
  style,
}) => {
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const currentChecked = locked || (isControlled ? checked : internalChecked);

  const handleClick = useCallback(() => {
    if (disabled || locked) return;

    if (isControlled) {
      onChange?.(!currentChecked)
    } else {
      setInternalChecked((prev) => {
        const next = !prev
        onChange?.(next)
        return next
      })
    }
  }, [currentChecked, disabled, locked, isControlled, onChange])

  return (
    <button
      type="button"
      role="switch"
      aria-checked={currentChecked}
      aria-disabled={disabled || locked}
      className={[
        styles.switch,
        styles[size],
        currentChecked ? styles.checked : '',
        disabled || locked ? styles.disabled : '',
        className
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      onClick={handleClick}
    >
      <span className={styles.thumb} />
    </button>
  )
}

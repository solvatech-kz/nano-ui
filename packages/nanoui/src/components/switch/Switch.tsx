'use client';

import {type FC} from 'react'
import styles from './Switch.module.css';

interface SwitchProps {
  // Флаг для управляемого состояния. Если `true`, переключатель включен.
  checked?: boolean;

  // Флаг для неуправляемого состояния. Определяет начальное значение.
  // Игнорируется, если `checked` задан.
  defaultChecked?: boolean;

  // Флаг, указывающий на принудительно включенное состояние.
  // В этом состоянии переключатель неактивен, но выглядит как `checked`.
  locked?: boolean;

  // Размер компонента.
  // 'sm' - маленький.
  // 'md' - средний (по умолчанию).
  // 'lg' - большой.
  size?: 'sm' | 'md' | 'lg';

  // Обработчик события изменения состояния.
  // Вызывается при переключении пользователем.
  onChange?: (checked: boolean) => void;

  // Флаг, отключающий компонент. В этом состоянии он неактивен.
  disabled?: boolean;

  // Дополнительные CSS-классы для корневого элемента компонента.
  className?: string;

  // Дополнительные стили для корневого элемента компонента.
  style?: React.CSSProperties;
}

export const Switch:FC<SwitchProps> = ({size='sm', ...props})=> {
  return (
    <label className="switch" style={styles}>
      <input className={styles[size]} type="checkbox" onChange={(e)=> props.onChange?.(e.target.checked)} checked={props.defaultChecked}  />
      <span className="slider"></span>
  </label>)
}

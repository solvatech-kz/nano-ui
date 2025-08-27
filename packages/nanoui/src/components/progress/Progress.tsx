import { type FC } from 'react'
import styles from './Progress.module.css'

interface ProgressProps {
  // Текущее значение прогресса. Если не задано, компонент будет
  // в режиме неопределенного прогресса (indeterminate).
  value?: number;

  // Максимальное значение, которое представляет 100% прогресса.
  // По умолчанию 100.
  max?: number;

  // Размер компонента.
  // 'sm' - маленький.
  // 'md' - средний (по умолчанию).
  // 'lg' - большой.
  size?: 'sm' | 'md' | 'lg';

  // Дополнительные CSS-классы для корневого элемента компонента.
  className?: string;

  // Дополнительные стили для корневого элемента компонента.
  style?: React.CSSProperties;
}

const Progress: FC<ProgressProps> = ({ value, max = 100, size = 'md', className, style }) => {
  const allStyles: Array<string | undefined> = [styles['progress'], size ? styles[size] : undefined, className];
  const classNames: string = allStyles.filter(v => v !== undefined).join(" ");
  const width: string = value ? Math.min(Math.floor(value / max * 100), 100) + "%" : "0";

  return (
    <div
      className={classNames}
      style={{ ...style, ...{ '--progress-value': width } }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={value ? 0 : undefined}
      aria-valuemax={value ? max : undefined}
      aria-label={`Прогресс: ${ value ? width : 'не задан'}`}
    />
  );
}

export default Progress;

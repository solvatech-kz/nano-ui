import type {CSSProperties, FC, ReactNode} from 'react'
import styles from './List.module.css'

interface ListItem {
  id: string | number
  text: string | ReactNode
  icon?: ReactNode
  multiline?: boolean
}

interface ListProps {
  items: ListItem[]
  ordered?: boolean
  className?: string
  style?: CSSProperties
}

export const List: FC<ListProps> = ({items, ordered = true, className, style}) => {
  const ListTag = ordered ? 'ol' : 'ul'
  return (
    <ListTag className={`${className || ''} ${styles.list} ${!ordered ? styles.unordered : ''}`} style={style}>
      {items.map(({id, icon, text, multiline}) => (
        <li key={id} className={`${styles.item} ${multiline ? styles.multiline : styles.singleLine}`}>
          <div className={styles.content}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.text}>{text}</span>
          </div>
          <hr className={styles.separator} />
        </li>
      ))}
    </ListTag>
  )
}

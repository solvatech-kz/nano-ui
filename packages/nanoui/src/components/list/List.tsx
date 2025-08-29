import React from 'react';
import styles from './List.module.css';

interface ListItem {
  id: string | number;
  text: string | React.ReactNode;
  icon?: React.ReactNode;
  multiline?: boolean;
}

interface ListProps {
  items: ListItem[];
  ordered?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const List :React.FC<ListProps> = ({items, ordered = true, className, style}) => {
  const ListTag = ordered ? "ol" : "ul";
return (
  <ListTag className={`${className || ""} ${styles.list} ${!ordered ? styles.unordered : ""}`} style={style}>
    {items.map(({id, icon, text, multiline}) => (
      <li key={id} className={`${styles.item} ${multiline ? styles.multiline : styles.singleLine}`}>
        <div className={styles.content}>
          {icon &&
            <span className={styles.icon}>
          {icon}
        </span>}
          <span className={styles.text}>
          {text}
        </span>
        </div>
      </li>
    ))}
  </ListTag>
);
};

export default List;

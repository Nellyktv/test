import type { StoreThing } from "../types/model"
import styles from "./ItemTitle.module.css"

type Props = {
  data: StoreThing
  onPush: (item: StoreThing) => void
}

export const ItemTitle = ({ data, onPush }: Props) => {
  // В тестовом считаем все товары "в наличии"
  const inStock = true;

  return (
    <div className={styles.card}>
      <img src={data.image} alt={data.title} />
      <div className={styles.title}>{data.title}</div>
      <div className={styles.description}>
        {data.description.substring(0, 60)}...
      </div>
      <div className={styles.price}>${data.price.toFixed(2)}</div>
      
      <div className={`${styles.stock} ${inStock ? styles.stockInStock : styles.stockOutOfStock}`}>
        {inStock ? 'В наличии' : 'Нет в наличии'}
      </div>
      
      <button 
        onClick={() => onPush(data)}
        disabled={!inStock}
        className={inStock ? styles.button : styles.buttonDisabled}
      >
        Добавить
      </button>
    </div>
  )
}
import { useState } from 'react';
import type { BasketThing } from '../types/model';
import { readBasket, writeBasket } from '../storage/basketMemory';
import styles from './BasketPage.module.css';

export const BasketPage = () => {
  const [list, setList] = useState<BasketThing[]>(readBasket());

  const remove = (id: number) => {
    const next = list.filter((el) => el.id !== id);
    setList(next);
    writeBasket(next);
  };

  const updateAmount = (id: number, delta: number) => {
    const item = list.find((el) => el.id === id);
    if (!item) return;
    const newAmount = item.amount + delta;
    if (newAmount < 1) return;
    const next = list.map((el) =>
      el.id === id ? { ...el, amount: newAmount } : el
    );
    setList(next);
    writeBasket(next);
  };

  const total = list.reduce((sum, el) => sum + el.price * el.amount, 0);

  if (!list.length) {
    return <p className={styles.empty}>Корзина пустая</p>;
  }

  return (
    <div className={styles.box}>
      {list.map((el) => (
        <div key={el.id} className={styles.row}>
          <img
            src={el.image}
            alt={el.title}
            className={styles.img}
          />
          <div className={styles.info}>
            <div className={styles.title}>{el.title}</div>
            <div className={styles.price}>
              ${el.price} × {el.amount} = ${(el.price * el.amount).toFixed(2)}
            </div>
          </div>
          <div className={styles.controls}>
            <button 
              onClick={() => updateAmount(el.id, -1)}
              disabled={el.amount <= 1}
              className={styles.controlBtn}
            >
              -
            </button>
            <span className={styles.amount}>{el.amount}</span>
            <button 
              onClick={() => updateAmount(el.id, 1)}
              className={styles.controlBtn}
            >
              +
            </button>
            <button onClick={() => remove(el.id)} className={styles.remove}>
              Удалить
            </button>
          </div>
        </div>
      ))}
      <div className={styles.total}>Итого: ${total.toFixed(2)}</div>
    </div>
  );
};
import { useEffect, useState } from 'react';
import { loadAllStuff, loadGroups } from '../data/api/dataApi';
import type { StoreThing, BasketThing } from '../types/model';
import { ItemTitle } from '../components/ItemTitle';
import { readBasket, writeBasket } from '../storage/basketMemory';
import styles from './ShopPage.module.css';
import { sortOptions } from '../data/shopPageData/shopPageData';

export const ShopPage = () => {
  const [items, setItems] = useState<StoreThing[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [picked, setPicked] = useState('all');
  const [sortMode, setSortMode] = useState('');
  const [page, setPage] = useState(1);
  const [basket, setBasket] = useState<BasketThing[]>(readBasket());
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    Promise.all([loadAllStuff(), loadGroups()]).then(
      ([loadedItems, loadedCategories]) => {
        setItems(loadedItems);
        setCategories(loadedCategories);
        setLoading(false);
      },
    );
  }, []);

  if (loading) {
    return (
      <div className={styles.main_container}>
        <div className={styles.grid}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonDescription}></div>
              <div className={styles.skeletonDescription}></div>
              <div className={styles.skeletonPrice}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  let filtered = [...items];

  if (debouncedQuery) {
    filtered = filtered.filter((el) =>
      el.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }

  if (picked !== 'all') {
    filtered = filtered.filter((el) => el.category === picked);
  }

  if (sortMode === 'up') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortMode === 'down') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortMode === 'az') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortMode === 'za') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  const pageSize = 12;
  const start = (page - 1) * pageSize;
  const visibleItems = filtered.slice(start, start + pageSize);
  const maxPage = Math.ceil(filtered.length / pageSize);

  const addItem = (product: StoreThing) => {
    const existing = basket.find((el) => el.id === product.id);
    let next;

    if (existing) {
      next = basket.map((el) =>
        el.id === product.id ? { ...el, amount: el.amount + 1 } : el,
      );
    } else {
      next = [...basket, { ...product, amount: 1 }];
    }

    setBasket(next);
    writeBasket(next);

    setMessage(`✅ ${product.title} добавлен`);
    setTimeout(() => setMessage(null), 2000);
  };

  if (filtered.length === 0) {
    return (
      <div className={styles.main_container}>
        <div className={styles.emptyState}>Товары не найдены</div>
      </div>
    );
  }

  return (
    <div className={styles.main_container}>
      {message && <div className={styles.toast}>{message}</div>}
      
      <div className={styles.controls}>
        <input
          placeholder='Поиск'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={picked} onChange={(e) => setPicked(e.target.value)}>
          <option value='all'>Все категории</option>
          {categories.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
          {sortOptions.map((el) => (
            <option key={el.value} value={el.value}>
              {el.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {visibleItems.map((el) => (
          <ItemTitle key={el.id} data={el} onPush={addItem} />
        ))}
      </div>

      <div className={styles.pager}>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          ←
        </button>
        <span>
          {page} / {maxPage}
        </span>
        <button
          disabled={page >= maxPage}
          onClick={() => setPage((p) => p + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
};
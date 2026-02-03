import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './global.css';
import { linksData, routesData } from './data/linksData/linksData';
import { readBasket } from './storage/basketMemory';

export const App = () => {
  const basket = readBasket();
  const totalCount = basket.reduce((sum, item) => sum + item.amount, 0);

  return (
    <BrowserRouter>
      <nav>
        {linksData.map((el) => (
          <Link 
            to={el.linkSrc} 
            key={el.id}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            {el.nameLink}
            {el.linkSrc === '/basket' && totalCount > 0 && (
              <span className="badge">{totalCount}</span>
            )}
          </Link>
        ))}
      </nav>

      <Routes>
        {routesData.map((el) => (
          <Route key={el.id} path={el.path} element={<el.nameElement />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
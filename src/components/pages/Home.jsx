import React from 'react';
import PizzaBlock from '../PizzaBlock';
import Categories from '../categories';
import Sort from '../sort';
import Sceleton from '../PizzaBlock/Sceleton';
import Pagination from '../Pagination';
import { AppContext } from '../../App';

function Home() {
  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isloading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const [sortArrow, setSortArrow] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63c47de98067b6bef6d9df3d.mockapi.io/items?page=${currentPage}&limit=5${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=${sortArrow ? 'desc' : 'asc'}&search=${searchValue}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    // При первом открытии страницы экран будет автоматический
    // сколицца вверх
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortArrow, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);
  const pizzas = items
    // Поиск по готовому массиву (локального или уже загруженного)
    //   .filter((obj) => {
    //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //       return true;
    //     }
    //     return false;
    //   })
    .map((obj) => (
      <PizzaBlock
        key={obj.id}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ));
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          value={sortType}
          valueArrow={sortArrow}
          onClickSort={(id) => setSortType(id)}
          onClickArrow={(id) => setSortArrow(id)}
        />
      </div>

      {searchValue ? (
        <h2 className="content__title">Поиск: "{searchValue}"</h2>
      ) : (
        <h2 className="content__title">Все пиццы</h2>
      )}
      <div className="content__items">
        {/* <PizzaBlock title="Мексеканская" price="500" />
        <PizzaBlock title="Мексеканская" />
        <PizzaBlock title="Арабская" /> */}
        {/* {console.log(sortArrow)} */}

        {isloading ? skeletons : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
}

export default Home;

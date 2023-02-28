import React from 'react';
import PizzaBlock from '../PizzaBlock';
import Categories from '../categories';
import Sort, { list } from '../sort';
import Sceleton from '../PizzaBlock/Sceleton';
import { Pagination } from '../Pagination';
import { AppContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setFilters } from '../../redux/slices/filterSort';
// import { changePage } from '../../redux/slices/filterSort';

function Home() {
  // const history = useHistory();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const [isloading, setIsLoading] = React.useState(true);
  // const categoria = useSelector((state) => state.categoria.value);
  const sort = useSelector((state) => state.sort);
  const [sortArrow, setSortArrow] = React.useState(false);

  const [sortName, setSortName] = React.useState(sort.sort.name);
  React.useEffect(() => {
    setSortName(sort.sort.name);
  }, [sort.sort.name]);

  const fetchPizzas = () => {
    setIsLoading(true);
    // fetch(
    //   `https://63c47de98067b6bef6d9df3d.mockapi.io/items?page=${sort.page}&limit=3${
    //     sort.value > 0 ? `&category=${sort.value}` : ''
    //   }&sortBy=${sort.sortProperty}&order=${sortArrow ? 'desc' : 'asc'}&search=${searchValue}`,
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });
    // console.log(sort.page);
    // console.log(sort.page.payload);
    // При первом открытии страницы экран будет автоматический
    // сколицца вверх

    axios
      .get(
        `https://63c47de98067b6bef6d9df3d.mockapi.io/items?page=${sort.page}&limit=3${
          sort.categoryId > 0 ? `&category=${sort.categoryId}` : ''
        }&sortBy=${sort.sort.sortProperty}&order=${
          sortArrow ? 'desc' : 'asc'
        }&search=${searchValue}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sort.sortProperty,
        name: sort.sort.name,
        categoryId: sort.categoryId,
        currentPage: sort.page,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sort.categoryId, sort.sort.sortProperty, sortArrow, sort.page]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList = list.find((obj) => obj.sortProperty === params.sortProperty);
      const sortName = list.find((obj) => obj.name === params.name);
      // // const currentPage = Number(params.currentPage);
      console.log(sortName);
      dispatch(
        setFilters({
          ...params,
          sortList,
          sortName,
          //currentPage: isNaN(currentPage) ? 1 : currentPage, // если currentPage не является числом, то устанавливаем значение по умолчанию 1
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [sort.categoryId, sort.sort.sortProperty, sortArrow, searchValue, sort.page]);

  // const [currentPage, setCurrentPage] = React.useState(1);
  // console.log(sort.sortProperty);

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
        <Categories />
        <Sort
          // value={sortType}
          valueArrow={sortArrow}
          // onClickSort={(id) => setSortType(id)}
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
      <Pagination />
      {/* onChangePage={(id) => dispatch(changePage(id))} */}
    </>
  );
}

export default Home;

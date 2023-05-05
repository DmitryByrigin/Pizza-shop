import React from 'react';
import PizzaBlock from '../PizzaBlock';
import Categories from '../categories';
import Sort, { list } from '../sort';
import Sceleton from '../PizzaBlock/Sceleton';
import { Pagination } from '../Pagination';
// import { AppContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { selectFilter, setCurrentPage, setFilters } from '../../redux/filter/slice';

import { setItems, fetchPizzas, selectPizzaData } from '../../redux/slices/pizzaSlice';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { searchValue } = React.useContext(AppContext);
  const { items, status } = useSelector(selectPizzaData);
  // console.log(items);
  // const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  // console.log(sort);
  const isMounted = React.useRef(false);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizzas = async () => {
    // setIsLoading(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.order;
    const category = categoryId > 0 ? categoryId : '';
    const search = searchValue ? `search=${searchValue}` : '';
    //   await axios
    //     .get(`https://63c47de98067b6bef6d9df3d.mockapi.io/items`, {
    //       params: {
    //         page: currentPage,
    //         limit: 4,
    //         category,
    //         sortBy,
    //         order: order,
    //         search,
    //       },
    //     })
    //     .then((res) => {
    //       setItems(res.data);
    //       setIsLoading(false);
    //       console.log('Get data');
    //     });
    //   console.log('create request');
    //
    // try {
    // const { data } = await axios.get(`https://63c47de98067b6bef6d9df3d.mockapi.io/items`, {
    //   params: {
    //     page: currentPage,
    //     limit: 4,
    //     category,
    //     sortBy,
    //     order: order,
    //     search,
    //   },
    // });
    // console.log(data);
    // setItems(res.data);
    const changeArrow = sort.arrow;
    //@ts-ignore
    dispatch(fetchPizzas({ category, sortBy, order, changeArrow, search, currentPage }));
    // setIsLoading(false);
    // } catch (error) {
    //   // setIsLoading(false);
    //   console.log(error);
    // }
    // console.log(sort.arrow);
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, []);
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage, sort]);
  // categoryId, sort.sortProperty, searchValue, currentPage
  const skeletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);
  const pizzas = items
    // Поиск по готовому массиву (локального или уже загруженного)
    //   .filter((obj) => {
    //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //       return true;
    //     }
    //     return false;
    //   })
    .map((obj: any) => (
      // <Link to={`/pizza/${obj.id}`}>
      <PizzaBlock
        key={obj.id}
        id={obj.id}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
      // </Link>
    ));
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      {searchValue ? (
        <h2 className="content__title">Поиск: "{searchValue}"</h2>
      ) : (
        <h2 className="content__title">Все пиццы</h2>
      )}

      {/* <PizzaBlock title="Мексеканская" price="500" />
        <PizzaBlock title="Мексеканская" />
        <PizzaBlock title="Арабская" /> */}
      {/* {console.log(sortArrow)} */}
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить позже</p>
        </div>
      ) : (
        <div className="content__items"> {status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      {/* onChangePage={(id) => dispatch(changePage(id))} */}
    </>
  );
};

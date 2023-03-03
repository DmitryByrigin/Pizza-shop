import React from 'react';
import PizzaBlock from '../PizzaBlock';
import Categories from '../categories';
import Sort, {list} from '../sort';
import Sceleton from '../PizzaBlock/Sceleton';
import {Pagination} from '../Pagination';
import {AppContext} from '../../App';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import {useNavigate} from 'react-router-dom';
import {setFilters} from '../../redux/filter/slice';
import {selectFilter} from "../../redux/filter/selectors";

function Home() {
    const dispatch = useDispatch();
    const {searchValue} = React.useContext(AppContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const {categoryId, sort, currentPage} = useSelector(selectFilter);

    const [sortArrow, setSortArrow] = React.useState(true);

    const fetchPizzas = () => {
        setIsLoading(true);
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? categoryId : ''
        const search = searchValue ? `search=${searchValue}` : '';
        axios
            .get(
                `https://63c47de98067b6bef6d9df3d.mockapi.io/items`,
                {
                    params: {
                        page: currentPage,
                        limit: 4,
                        category,
                        sortBy,
                        order: order,
                        search,
                    }
                }
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
    };

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
            dispatch(
                setFilters({
                    ...params,
                    sort
                }),
            );
        }
    }, []);

    React.useEffect(() => {
        fetchPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, index) => <Sceleton key={index}/>);
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
                <Categories/>
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

                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination/>
            {/* onChangePage={(id) => dispatch(changePage(id))} */}
        </>
    );
}

export default Home;

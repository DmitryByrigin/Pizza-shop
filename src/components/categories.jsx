import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategories } from '../redux/slices/filterSort';

function Categories() {
  // const onClickCategories = (id) => {
  //   setActiveIndex(id);
  //   //console.log(id);
  // };
  const count = useSelector((state) => state.sort);
  const dispatch = useDispatch();
  // console.log(count);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, id) => (
          <li
            key={id}
            onClick={() => dispatch(changeCategories(id))}
            className={id === count.categoryId ? 'active' : ''}>
            {/* {console.log(count.payload)} */}
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

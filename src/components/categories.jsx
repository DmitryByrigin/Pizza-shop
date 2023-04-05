import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../redux/filter/slice';
import { setCategoryId } from '../redux/filter/slice';

function Categories() {
  const sort = useSelector(selectFilter);
  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, id) => (
          <li
            key={id}
            onClick={() => dispatch(setCategoryId(id))}
            className={id === sort.categoryId ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

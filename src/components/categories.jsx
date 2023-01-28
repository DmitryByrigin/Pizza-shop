import React from 'react';

function Categories({ value, onClickCategory }) {
  // console.log(value);

  // const onClickCategories = (id) => {
  //   setActiveIndex(id);
  //   //console.log(id);
  // };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, id) => (
          <li key={id} onClick={() => onClickCategory(id)} className={value === id ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

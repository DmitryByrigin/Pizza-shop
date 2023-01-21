import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCategories = (id) => {
    setActiveIndex(id);
    //console.log(id);
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((value, id) => (
          <li
            key={id}
            onClick={() => onClickCategories(id)}
            className={activeIndex === id ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

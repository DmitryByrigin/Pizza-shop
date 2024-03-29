// import { current } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../../redux/filter/cartSlice';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();
  // const [pizzaCount, setPizzaCount] = React.useState(0);
  const [sizePizza, setSizePizza] = React.useState<number>(0);
  const [typePizza, setTypePizza] = React.useState<number>(0);
  const cartItem = useSelector(selectCartItemById(id));
  const typeNames = ['традиционное', 'тонкое'];

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[typePizza],
      size: sizes[sizePizza],
    };
    dispatch(addItem(item));
  };
  const addedCount = cartItem ? cartItem.count : 0;
  //console.log(useSelector((state) => state.cart.items.find((obj) => obj.id === id)));

  // const onClickSize = (id) => {
  //   setSizePizza(id);
  // };

  // const onClickAdd = () => {
  //   setPizzaCount(pizzaCount + 1);
  // };
  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <Link to={`/pizza/${id}`}>
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              className={typePizza === typeId ? 'active' : ''}
              onClick={() => setTypePizza(typeId)}>
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={size}
              className={sizePizza === i ? 'active' : ''}
              onClick={() => setSizePizza(i)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;

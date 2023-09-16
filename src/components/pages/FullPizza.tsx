import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './FullPizza.module.scss';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63c47de98067b6bef6d9df3d.mockapi.io/items/' + id);
        setPizza(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza)
    return (
      <>
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>
              Загрузка <span>😉</span>
            </h2>
            <p>Пожалуйста подождите...</p>
            <img src={require('../../img/empty-cart.png')} alt="Empty cart" />
          </div>
        </div>
      </>
    );

  return (
    <section className={`${styles.fullPizza} container`}>
      <img style={{ width: '500px' }} src={pizza.imageUrl} alt="" />
      <article>
        <h1>{pizza.title}</h1>
        <h2>{pizza.price} ₽</h2>
        <h2>Описание</h2>
        <p>
          Сырная пицца - это классическая пицца, которая состоит из хрустящего теста, томатного
          соуса и разнообразных видов сыра, обычно моцареллы. Она может быть приготовлена в
          различных вариациях, например, с добавлением грибов, оливок, перцев и других ингредиентов.
        </p>
        <ul>
          <li>
            <b>• Пармезан, рикотта, горгонзола</b>
          </li>
          <li>
            <b>• Моцарелла</b>
          </li>
          <li>
            <b>• Перец</b>
          </li>
        </ul>

        <div className="pizza-block__bottom">
          <div className="button button--outline button--add">
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
          </div>
        </div>
      </article>
    </section>
  );
};

export default FullPizza;

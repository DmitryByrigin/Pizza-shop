import React from 'react';
import PizzaBlock from '../PizzaBlock';
import Categories from '../categories';
import Sort from '../sort';
import Sceleton from '../PizzaBlock/Sceleton';

function Home() {
  const [items, setItems] = React.useState([]);
  const [isloading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://63c47de98067b6bef6d9df3d.mockapi.io/items')
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
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* <PizzaBlock title="Мексеканская" price="500" />
        <PizzaBlock title="Мексеканская" />
        <PizzaBlock title="Арабская" /> */}

        {isloading
          ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
          : items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))}
      </div>
    </>
  );
}

export default Home;

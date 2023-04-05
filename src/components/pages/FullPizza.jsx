import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FullPizza() {
  const [pizza, setPizza] = React.useState();
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

  if (!pizza) return 'Загрузка...';

  return (
    <section className="container">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt="" />
      <h4>{pizza.price}</h4>
    </section>
  );
}

export default FullPizza;

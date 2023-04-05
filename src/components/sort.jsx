import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSort, setOrder, setSort, setArrow } from '../redux/filter/slice';

export const list = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort() {
  const [open, setOpen] = React.useState(false);
  const sort = useSelector(selectSort);
  const dispatch = useDispatch();
  const sortRef = React.useRef();

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handelClickOutside = (event) => {
      const path = event.composedPath();
      // console.log(path);
      // console.log(sortRef.current);
      if (!path.includes(sortRef.current)) {
        setOpen(false);
        // console.log('outside');
      }
    };

    document.body.addEventListener('click', handelClickOutside);

    return () => {
      document.body.removeEventListener('click', handelClickOutside);
    };
  }, []);

  // console.log(sort);
  // const onClickArrow = (value) => {
  //     dispatch(setOrder(value === 'desc' ? 'asc' : 'desc'));
  // }

  const onChangeSort = React.useCallback(() => {
    dispatch(setOrder(sort.order));
    dispatch(setArrow(sort.arrow));
    console.log(setOrder(sort.arrow));
  }, [sort.order, sort.arrow]);
  // let a = true;

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          // dispatch(setOrder(!'asc'))
          onClick={() => onChangeSort()}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          {sort.arrow === 'arrow-down' ? <path d="M6 9l6 6 6-6" /> : <path d="M18 15l-6-6-6 6" />}
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, id) => (
              <li
                key={id}
                onClick={() => onClickListItem(obj)}
                className={sort.name === obj.name ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;

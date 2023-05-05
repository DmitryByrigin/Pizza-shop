import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSort, setOrder, setSort, setArrow } from '../redux/filter/slice';

type SortItem = {
  name: string;
  sortProperty: string;
};

export const list: SortItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

interface PopupClick extends React.MouseEvent<HTMLBodyElement> {
  composedPath?: () => EventTarget[];
}

function Sort() {
  const [open, setOpen] = React.useState(false);
  const sort = useSelector(selectSort);
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handelClickOutside = (event: MouseEvent) => {
      const path = (event as unknown as PopupClick)?.composedPath?.() ?? [];

      if (path && sortRef.current && !path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handelClickOutside);

    return () => {
      document.body.removeEventListener('click', handelClickOutside);
    };
  }, []);

  const onChangeSort = React.useCallback(() => {
    dispatch(setOrder(sort.order));
    dispatch(setArrow(sort.arrow));
  }, [sort.order, sort.arrow]);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
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

import React from 'react';

function Sort({ value, onClickSort, onClickArrow, valueArrow }) {
  const [open, setOpen] = React.useState(false);
  // const [ClickSort, setClickSort] = React.useState(0);

  const list = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const onClickListItem = (i, value) => {
    onClickSort(i);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          onClick={() => onClickArrow(!valueArrow)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          {valueArrow ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, id) => (
              <li
                key={id}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
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

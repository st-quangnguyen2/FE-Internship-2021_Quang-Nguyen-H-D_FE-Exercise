import React, { useState } from 'react';

export default function Footer({ itemsLeft, itemsCompleted, onClearCompleted, onViewItem }) {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  const handleClick = (filterVal) => {
    setFilter(filterVal);
    onViewItem(filterVal);
  };

  const FilterItem = ({ label, value }) => {
    return (
      <li className={filter === value ? 'filter-active' : ''} onClick={() => handleClick(value)}>
        {label}
      </li>
    );
  };

  return (
    <div className="todo-footer">
      <span>{itemsLeft} items left</span>
      <ul className="todo-filter">
        {filterOptions.map(({ label, value }) => (
          <FilterItem label={label} value={value} key={value} />
        ))}
      </ul>
      <button className={itemsCompleted ? '' : 'hidden'} onClick={() => onClearCompleted()}>
        Clear Completed
      </button>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Footer';
import Item from '../Item';
import todoApp from '../../asset/images/todo-app.svg';

export default function Wrapper() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('todo-items'))
      ? JSON.parse(localStorage.getItem('todo-items'))
      : []
  );
  const [checkAll, setCheckAll] = useState(true);
  const [view, setView] = useState('all');
  const inputNewItem = useRef(null);

  useEffect(() => {
    localStorage.setItem('todo-items', JSON.stringify(items));
  }, [items]);

  const checkedAll = (isChecked) => {
    setItems(items.map((item) => ({ ...item, checked: isChecked })));
    setCheckAll(!checkAll);
  };

  const showTodoItem = (items, view) => {
    let content = [];
    if (view === 'all') {
      content = [...items];
    } else {
      if (view === 'completed') {
        content = items.filter((item) => item.checked);
      } else {
        content = items.filter((item) => !item.checked);
      }
    }
    return content
      .map((item, index) => {
        return (
          <Item
            key={index}
            index={index}
            content={item.content}
            checked={item.checked}
            onChecked={onChecked}
            onDeleted={onDeleted}
            onEditItem={onEditItem}
          />
        );
      })
      .reverse();
  };

  const addNewItem = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      setItems([
        ...items,
        {
          content: inputNewItem.current.value,
          checked: false,
        },
      ]);
      inputNewItem.current.value = '';
    }
  };

  const onClearCompleted = () => {
    let tempItems = items.filter((item) => !item.checked);
    setItems(tempItems);
  };

  const onChecked = (index) => {
    items[index].checked = !items[index].checked;
    setItems([...items]);
  };

  const onDeleted = (index) => {
    items.splice(index, 1);
    setItems([...items]);
  };

  const onViewItem = (view) => {
    setView(view);
  };

  const onEditItem = (index, content) => {
    items[index].content = content;
    setItems([...items]);
  };

  return (
    <div className="wrapper">
      <div className="todo-header">
        <span onClick={() => checkedAll(checkAll)}>
          <img src={todoApp} alt=""></img>
        </span>
        <input
          ref={inputNewItem}
          type="text"
          autoFocus
          placeholder="What need to be done?"
          onKeyUp={addNewItem}
        />
      </div>
      <div>
        <ul className="todo-list">{showTodoItem(items, view)}</ul>
      </div>
      {items.length ? (
        <Footer
          itemsLeft={items.filter((item) => !item.checked).length}
          itemsCompleted={items.some((item) => item.checked)}
          onClearCompleted={onClearCompleted}
          onViewItem={onViewItem}
        />
      ) : (
        ''
      )}
    </div>
  );
}

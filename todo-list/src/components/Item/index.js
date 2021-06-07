import React, { useState, useRef, useEffect } from 'react';
import active from '../../asset/images/active.svg';
import completed from '../../asset/images/completed.svg';
import remove from '../../asset/images/remove.svg';

export default function Item({ checked, content, onDeleted, onChecked, onEditItem, index }) {
  const [inputStatus, setInputStatus] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputStatus) {
      inputRef.current.value = content;
      inputRef.current.focus();
    }
  }, [inputStatus]);

  const onDoubleClick = () => {
    setInputStatus(true);
  };

  const onKeyUp = (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
      onEditItem(index, inputRef.current.value);
      setInputStatus(false);
    }
  };

  const onBlur = () => {
    onEditItem(index, inputRef.current.value);
    setInputStatus(false);
  };

  return (
    <li className="todo-item">
      <span onClick={() => onChecked(index)}>
        <img src={checked ? completed : active} alt="" />
      </span>
      {inputStatus ? (
        <input autoFocus ref={inputRef} onKeyUp={onKeyUp} onBlur={onBlur} />
      ) : (
        <label className={checked ? 'text-completed ' : ''} onDoubleClick={onDoubleClick}>
          {content}
        </label>
      )}
      <button onClick={() => onDeleted(index)}>
        <img src={remove} alt="" />
      </button>
    </li>
  );
}

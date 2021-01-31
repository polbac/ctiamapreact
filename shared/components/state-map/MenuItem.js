import React from 'react';
import s from './assets/scss/main.scss';

export default function MenuItem({ item, index, onSelected, active }) {
  return (
    <div key={index} className={s.item}>
      <div
        onClick={() => onSelected(item)}
        onKeyDown={() => onSelected(item)}
        tabIndex="0"
        role="button"
        className={`${active ? s.active : ''}`}
      >
        {item}
      </div>
    </div>
  );
}

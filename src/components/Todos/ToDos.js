import React from 'react';
import css from './ToDos.module.css';

export const ToDos = ({ toDos }) => {
  if (toDos === undefined || !toDos.length) return null;

  return (
    <div className={css.todos}>
      {toDos.map((toDo, index) => (
        <span
          nav-selectable="true"
          key={index}
          className={`${css.todo} ${toDo.completed ? css.completed : ''}`}>
          {toDo.name}
        </span>
      ))}
    </div>
  )
}


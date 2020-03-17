import React from 'react';
import css from './Todos.module.css';
import { T_todo } from "../../types";

interface ToDosProps {
	toDos: Array<T_todo>;
}

export const Todos: React.FC<ToDosProps> = ({ toDos }) => {
	if (toDos === undefined || !toDos.length) return null;

	return (
		<div className={css.todos}>
			{
				toDos.map((toDo, index) => (
					<span
						nav-selectable="true"
						todo-id={toDo.id}
						key={index}
						className={`${css.todo} ${toDo.completed ? css.completed : ''}`}
					>
						{toDo.name}
					</span>
				))
			}
		</div>
	);
};

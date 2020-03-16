import React from 'react';
import css from './Todos.module.css';

interface ToDosProps {
	toDos: Array<{ completed: boolean, id: number, name: string; }>;
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

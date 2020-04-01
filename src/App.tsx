import React, { useState, useEffect } from "react";
import {
	Header,
	Input,
	Softkey,
	Todos,
} from "./components";
import { useNavigation } from "./hooks";
import { DatabaseService } from './services/Database';
import { T_todo } from "./types";
import {
	getNumberAttributeFromElement,
	keyEventFactory,
} from "./utils";

export default function App () {
	const getTodosFromDatabase = () => {
		DatabaseService.init().then(async () => {
			const todos = await DatabaseService.getAll() as T_todo[];
			setToDo(todos);
		});
	};
	useEffect(getTodosFromDatabase, []);

	// eslint-disable-next-line @typescript-eslint/no-array-constructor
	const [toDos, setToDo] = useState(Array<T_todo>());

	const [current, setNavigation] = useNavigation() as [HTMLElement, (index: number) => void];

	const onKeyCenter = keyEventFactory(
		async (spanEl) => {
			const todoId = getNumberAttributeFromElement(spanEl, "todo-id");
			const allTodos = await DatabaseService.toggleCompleted(todoId) as T_todo[];
			if (allTodos !== undefined && allTodos.length) {
				setToDo(allTodos);
			}
		},
		async (inputEl) => {
			if (inputEl.value) {
				const allTodos = await DatabaseService.add(inputEl.value) as T_todo[];
				if (allTodos !== undefined && allTodos.length) {
					setToDo(allTodos);
				}
				inputEl.value = "";
			}
		}
	);

	const onKeyRight = keyEventFactory(
		async (spanEl) => {
			const todoId = getNumberAttributeFromElement(spanEl, "todo-id");
			const allTodos = await DatabaseService.deleteById(todoId) as T_todo[];

			const currentIndex = getNumberAttributeFromElement(spanEl, "nav-index");
			if (allTodos !== undefined && allTodos.length) {
				setNavigation(currentIndex - 1);
				setToDo(allTodos);
			} else {
				setNavigation(0);
			}
		},
		async () => { }
	);

	return (
		<>
			<Header title="ToDo List" />

			<Input type="text" label="New task" />
			<Todos toDos={toDos} />

			<Softkey
				center={current.nodeName === "INPUT" ? "Insert" : "Toggle"}
				onKeyCenter={onKeyCenter}
				right={current.nodeName === "SPAN" ? "Delete" : ""}
				onKeyRight={onKeyRight}
			/>
		</>
	);
};

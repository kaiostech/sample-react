import React, { useState, useEffect } from "react";
import { Header, Input, Todos, Softkey } from "./components";
import { useNavigation } from "./hooks";
import { DatabaseService } from './services/Database';

export default function App() {
	const getTodosFromDatabase = () => {
		DatabaseService.init().then(async () => {
			const todos = await DatabaseService.getAll();
			setToDo(todos);
		});
	};

	useEffect(getTodosFromDatabase, []);

	const [toDos, setToDo] = useState([]);

	const [current, setNavigation] = useNavigation();

	const onKeyCenter = async () => {
		const currentElement = document.querySelector("[nav-selected=true]");
		const currentNavigationIndex = parseInt(currentElement.getAttribute("nav-index"), 10);

		const isATask = currentNavigationIndex > 0;
		if (isATask) {
			const todoId = parseInt(currentElement.getAttribute("todo-id"), 10);
			const allTodos = await DatabaseService.toggleCompleted(todoId);
			setToDo(allTodos);
		} else if (currentElement.value.length) {
			const allTodos = await DatabaseService.add(currentElement.value);
			setToDo(allTodos);
			currentElement.value = "";
		}
	};

	const onKeyRight = async () => {
		const currentElement = document.querySelector("[nav-selected=true]");
		const currentIndex = parseInt(currentElement.getAttribute("nav-index"), 10);

		if (currentIndex > 0) {
			const todoId = parseInt(currentElement.getAttribute("todo-id"), 10);
			const allTodos = await DatabaseService.deleteById(todoId);
			const goToPreviousElement = Boolean(allTodos.length);
			setNavigation(goToPreviousElement ? currentIndex - 1 : 0);
			setToDo(allTodos);
		}
	};

	return (
		<>
			<Header title="ToDo List" />

			<Input type="text" label="New task" />
			<Todos toDos={toDos} />

			<Softkey
				center={current.type === "INPUT" ? "Insert" : "Toggle"}
				onKeyCenter={onKeyCenter}
				right={current.type === "SPAN" ? "Delete" : ""}
				onKeyRight={onKeyRight}
			/>
		</>
	);
}

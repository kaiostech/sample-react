import React from "react";
import css from "./Input.module.css";

interface InputProps {
	label: string,
	type: string,
}

export const Input: React.FC<InputProps> = ({ label, type }) => (
	<div className={css.input}>
		<input id="input" type={type} nav-selectable="true" />
		<label htmlFor="input">{label}</label>
	</div>
);

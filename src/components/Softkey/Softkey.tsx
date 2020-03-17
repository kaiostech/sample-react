import React, { useEffect } from "react";
import css from "./Softkey.module.css";

interface SoftkeyProps {
	center?: string;
	onKeyCenter?: (e: KeyboardEvent) => void;
	left?: string,
	onKeyLeft?: (e: KeyboardEvent) => void;
	right?: string,
	onKeyRight?: (e: KeyboardEvent) => void;
}

export const Softkey: React.FC<SoftkeyProps> = (
	{
		center, onKeyCenter,
		left, onKeyLeft,
		right, onKeyRight,
	}) => {

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return (() => { document.removeEventListener("keydown", handleKeyDown); });
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		// ArrowLeft and ArrowRight only needed for in-browser testing
		switch (e.key) {
			case "SoftLeft":
			case "ArrowLeft":
				return onKeyLeft && onKeyLeft(e);
			case "Enter":
				return onKeyCenter && onKeyCenter(e);
			case "SoftRight":
			case "ArrowRight":
				return onKeyRight && onKeyRight(e);
			default:
				return;
		}
	};

	return (
		<div className={css.softkey}>
			<label className={css.left}>{left}</label>
			<label className={css.center}>{center}</label>
			<label className={css.right}>{right}</label>
		</div>
	);
};

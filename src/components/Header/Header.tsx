import React from 'react';
import css from './Header.module.css';

interface HeaderProps {
	title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => (
	<header className={css.header}>
		<span>{title}</span>
	</header>
);

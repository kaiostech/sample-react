import React from 'react'
import css from './Header.module.css';

export const Header = ({ title }) => {
  return (
    <header className={css.header}>
      <span>{title}</span>
    </header>
  )
}

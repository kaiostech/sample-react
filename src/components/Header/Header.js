import React from 'react'
import css from './Header.module.css';

export const Header = ({ title }) => (
  <header className={css.header}>
    <span data-l10n-id={title} />
  </header>
);

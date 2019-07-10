import React from "react";
import css from "./Input.module.css";

export const Input = ({ label, type }) => (
  <div className={css.input}>
    <input type={type} nav-selectable="true" />
    <label>{label}</label>
  </div>
)

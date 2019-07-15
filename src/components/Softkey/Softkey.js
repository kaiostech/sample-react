import React, { useEffect } from "react";
import css from "./Softkey.module.css";

export const Softkey = ({
  left,
  onKeyLeft,
  center,
  onKeyCenter,
  right,
  onKeyRight
}) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = evt => {
    switch (evt.key) {
      case "SoftLeft":
        return onKeyLeft && onKeyLeft(evt);
      case "Enter":
        return onKeyCenter && onKeyCenter(evt);
      case "SoftRight":
        return onKeyRight && onKeyRight(evt);
      default:
        return;
    }
  };

  return (
    <div className={css.softkey}>
      <label className={css.left} data-l10n-id={left} />
      <label className={css.center} data-l10n-id={center} />
      <label className={css.right} data-l10n-id={right} />
    </div>
  );
};

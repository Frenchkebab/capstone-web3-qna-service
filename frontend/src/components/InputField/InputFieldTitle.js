import React from 'react';
import styles from '../styles/InputFieldTitle.module.css';

function InputFieldTitle({
  type = 'text',
  placeholder,
  setInputFieldTitle,
  disabled = false,
  value,
}) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={(e) => setInputFieldTitle(e.target.value)}
      disabled={disabled}
      value={value}
    />
  );
}

export default InputFieldTitle;

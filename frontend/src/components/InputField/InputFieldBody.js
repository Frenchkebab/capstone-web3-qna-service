import React from 'react';
import styles from '../styles/InputFieldBody.module.css';

function InputFieldBody({
  type = 'text',
  placeholder,
  setInputFieldBody,
  disabled = false,
  value,
}) {
  return (
    <textarea
      className={styles.textarea}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        setInputFieldBody(e.target.value);
      }}
      disabled={disabled}
      value={value}
    />
  );
}

export default InputFieldBody;

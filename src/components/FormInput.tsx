import { useState } from 'react';
import {
  EMAIL_VALIDATION_MESSAGE,
  PASSWORD_HELP_TEXT,
  EMAIL,
  PASSWORD,
} from '../constants/form';

import styles from './styles/formInput.module.css';
import eye from '../assets/icons/eye.png';



type FormInputType = {
  name: string,
  type: string,
  value: string,
  setValue: (value: string) => void,
  validationError?: boolean,
}

const FormInput  = ({ type, name, value, setValue, validationError }: FormInputType) => {
  const [isFocused, setFocused] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)


  return (
    <div className={styles.container}>

      <fieldset className={validationError ? `${styles.fieldsetError} ${styles.fieldset}` : isFocused ? `${styles.fieldset} ${styles.fieldsetFocus}` : styles.fieldset}>
        <legend className={validationError ? `${styles.legendError} ${styles.legend}` : styles.legend} >
          { isFocused || value ? name : null }
        </legend>
        <input
          type={viewPassword ? 'text'  : type}
          id="text creator"
          className={styles.input}
          placeholder={!isFocused ? name : ''}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        { (type === PASSWORD) && (
          <img onClick={() => setViewPassword(prevState => !prevState)} className={styles.icon} src={eye} alt="eye" width="18" height="18" />
        )}
      </fieldset>
      { (type === EMAIL && validationError) && (
        <span className={`${styles.helpText} ${styles.validationError}`}>{ EMAIL_VALIDATION_MESSAGE }</span>
      )}
      { type === PASSWORD && (
        <span className={validationError ? `${styles.helpText} ${styles.validationError}` : styles.helpText}>{ PASSWORD_HELP_TEXT }</span>
      )}
    </div>
  )
}

export default FormInput;
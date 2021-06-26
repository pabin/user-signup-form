import React from 'react';
import { SELECT_TITLE, SELECT_OPTION1, SELECT_OPTION2, SELECT_OPTION3 } from '../constants/form';
import styles from './styles/formInput.module.css';

type FormSelectProps = {
  setValue: (value: string) => void,
}

const FormSelect  = ({ setValue }: FormSelectProps) => {
  return (
    <div className={styles.container}>
      <select data-testid="form-select" name="cars" id="cars" className={styles.select} onChange={(event) => setValue(event.target.value)}>
        <option value="">{ SELECT_TITLE }</option>
        <option value={SELECT_OPTION1}>{ SELECT_OPTION1 }</option>
        <option value={SELECT_OPTION2}>{ SELECT_OPTION2 }</option>
        <option value={SELECT_OPTION3}>{ SELECT_OPTION3 }</option>
      </select>
    </div>
  )
}

export default FormSelect;
import styles from './styles/button.module.css';

type ButtonProps = {
  title: string;
  disabled: boolean;
  onClick: () => void;
}

const Button  = ({ title, onClick, disabled }: ButtonProps) => (
  <button className={styles.button} onClick={onClick} disabled={disabled ? true : false}>
    { title }
  </button>
)

export default Button;
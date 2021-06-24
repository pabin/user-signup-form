import { HEADING_DESCRIPTION, HEADING_TITLE } from '../constants/heading';
import styles from './styles/heading.module.css';



const Heading  = () => (
  <div className={styles.container}>
    <p className={styles.title}>{ HEADING_TITLE }</p>
    <p className={styles.description}>{ HEADING_DESCRIPTION }</p>
  </div>
)

export default Heading;
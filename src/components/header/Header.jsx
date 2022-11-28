import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const Header = () => {
  return (
    <header>
      <div className={styles.header}>{logo}</div>
    </header>
  );
};

export default Header;

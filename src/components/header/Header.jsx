import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';

import { auth } from '../../firebase/config';
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

const cart = (
  <span className={styles.cart}>
    <Link to='/cart'>
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Header = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);

        if (user.displayName === null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setUsername(uName);
        } else {
          setUsername(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            username: user.displayName ? user.displayName : username,
            userID: user.uid,
          })
        );
      } else {
        setUsername('');
      }
    });
  }, [dispatch, username]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout Successfully');
        naviagte('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                : `${styles['nav-wrapper']}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={22} color='#fff' onClick={hideMenu} />
            </li>
            <li>
              <NavLink to='/' className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to='/login' className={activeLink}>
                Login
              </NavLink>
              <a href='#'>
                <FaUserCircle size={16} />
                Hi, {username}
              </a>
              <NavLink to='/register' className={activeLink}>
                Register
              </NavLink>
              <NavLink to='/order-history' className={activeLink}>
                My Orders
              </NavLink>
              <NavLink to='/' onClick={logoutUser}>
                Logout
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles['menu-icon']}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;

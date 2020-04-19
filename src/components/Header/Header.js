import React from 'react';
import {
  Alignment,
  Navbar,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <Navbar className={styles.root}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Movie-DB</NavbarHeading>
      </NavbarGroup>
    </Navbar>
  );
};
export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import HeaderTop from './HeaderTop';
import HeaderPosts from './HeaderPosts';
import styles from './Header.module.sass';

const Header = ({ path, overview }) => {
	const topPage = path === '/' ? styles.topPage : '';

	return (
		<header className={`${styles.header} ${topPage}`}>
			{topPage ? <HeaderTop overview={overview} /> : <HeaderPosts overview={overview} />}
		</header>
	);
};

Header.propTypes = {
	siteTitle: PropTypes.string
};

export default Header;

import React from 'react';
import { Link } from 'gatsby';
import shortid from 'shortid';
import styles from './Breadcrumb.module.sass';

const Breadcrumb = ({ categories, title }) => {
	console.log(categories);
	return (
		<div className={styles.breadcrumb}>
			<Link to="/" className={styles.link}>
				Home
			</Link>
			{categories &&
				categories.map((link, index) => {
					return (
						<Link key={shortid.generate()} to={`category/${link.toLowerCase()}`} className={styles.link}>
							{link}
						</Link>
					);
				})}
			<span>{title}</span>
		</div>
	);
};

export default Breadcrumb;

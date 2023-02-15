import { NavLink, useLocation } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";

import styles from "./Header.module.scss";

const Header = () => {
	const currentPagePath = useLocation().pathname;

	return (
		<header className={styles.Header}>
			<div className={styles.Header__Inner}>
				{currentPagePath === "/details" ? (
					<>
						<button className={styles.Header__BackBtn}>
							<NavLink to="/">
								<RiArrowLeftSLine />
								<span className={styles.Header__BackBtn__Text}>Back</span>
							</NavLink>
						</button>
						<h1>Employee details</h1>
					</>
				) : (
					<h1>Employees' list</h1>
				)}
			</div>
		</header>
	);
};

export default Header;

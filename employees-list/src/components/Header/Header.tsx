import { NavLink, useLocation } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";

import styles from "./Header.module.scss";
import { HeaderProps } from "../../types";

const Header = ({ headerText }: HeaderProps) => {
	const currentPagePath = useLocation().pathname;

	return (
		<header className={styles.Header}>
			<div className={styles.Header__Inner}>
				{currentPagePath === "/details" && (
					<>
						<button id="backBtn" type="button" className={styles.Header__BackBtn}>
							<NavLink to="/">
								<RiArrowLeftSLine />
								<span className={styles.Header__BackBtn__Text}>Back</span>
							</NavLink>
						</button>
					</>
				)}
				<h1>{headerText}</h1>
			</div>
		</header>
	);
};

export default Header;

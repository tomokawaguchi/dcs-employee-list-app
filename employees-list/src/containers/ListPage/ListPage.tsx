import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import fetchEmployeeData from "../../api/fetchEmployeeData";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import EmployeeList from "../EmployeeList/EmployeeList";

import styles from "./ListPage.module.scss";

const ListPage = () => {
	return (
		<main className={styles.ListPage}>
			<section className={styles.IntroSec}>
				<p>Please click on 'Edit' to find more details of each employee.</p>
				<Link to={`/details`}>
					<Button buttonText="Add employee" buttonStyle="primary" />
				</Link>
			</section>

			<section className={styles.ListSec}>
				<EmployeeList />
			</section>
		</main>
	);
};

export default ListPage;

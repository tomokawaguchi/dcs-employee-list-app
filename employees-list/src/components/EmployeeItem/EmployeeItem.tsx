import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EmployeeItem.module.scss";
import { Employee } from "../../types";

const EmployeeItem = ({ employeeData }: { employeeData: Employee }) => {
	const [currentData, setCurrentData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		mobile: "",
		residentialAddress: "",
		contractType: "",
		startDate: "",
		finishDate: "",
		workTimeType: "",
		hoursPerWeek: "",
		onGoing: "",
	});
	const { id, firstName, lastName, workTimeType, startDate, email } = employeeData;
	const yearStarted: number = +startDate?.slice(6); // year in string
	const currentYear: number = new Date().getFullYear();

	const handleDelete = async () => {
		try {
			await axios.delete(`/employees/${id}`);
			window.location.reload(); // reload the window to see the updates
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<li className={styles.EmployeeItem}>
			{/* For the employee details col */}
			<div className={styles.EmployeeItem__Inner}>
				<ul className={styles.EmployeeDetailsList}>
					<li className={styles.EmployeeDetailsList__Name}>{`${firstName} ${lastName}`}</li>
					<li className={styles.EmployeeDetailsList__WorkType}>
						{workTimeType.charAt(0).toUpperCase() + workTimeType.slice(1)}
						<span className={styles.EmployeeDetailsList__Separator}> - </span>
						{currentYear - yearStarted}yrs
					</li>
					<li className={styles.EmployeeDetailsList__Email}>{email.charAt(0).toUpperCase() + email.slice(1)}</li>
				</ul>
			</div>

			{/* For the edit/remove buttons col */}
			<div className={styles.ButtonsList}>
				<button className={styles.ButtonsList__Edit}>
					<Link to={`/details/${id}`}>Edit</Link>
				</button>
				<button className={styles.ButtonsList__Remove} onClick={handleDelete}>
					Remove
				</button>
			</div>
		</li>
	);
};

export default EmployeeItem;

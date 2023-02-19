import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./EmployeeItem.module.scss";
import { Employee } from "../../types";

interface EmployeeItemProps {
	employeeData: Employee;
	handleDelete: (id: number) => {};
}

const EmployeeItem = ({ employeeData, handleDelete }: EmployeeItemProps) => {
	const yearStarted: number = new Date(employeeData.startDate).getFullYear();
	const currentYear: number = new Date().getFullYear();

	return (
		<li className={styles.EmployeeItem}>
			{/* For the employee details col */}
			<div className={styles.EmployeeItem__Inner}>
				<ul className={styles.EmployeeDetailsList}>
					<li className={styles.EmployeeDetailsList__Name}>{`${employeeData.firstName} ${employeeData.lastName}`}</li>
					<li className={styles.EmployeeDetailsList__WorkType}>
						{employeeData.workTimeType.charAt(0).toUpperCase() + employeeData.workTimeType.slice(1)}
						<span className={styles.EmployeeDetailsList__Separator}> - </span>
						{currentYear - yearStarted}yrs
					</li>
					<li className={styles.EmployeeDetailsList__Email}>{employeeData.email.charAt(0).toUpperCase() + employeeData.email.slice(1)}</li>
				</ul>
			</div>

			{/* For the edit/remove buttons col */}
			<div className={styles.ButtonsList}>
				<button className={styles.ButtonsList__Edit}>
					<Link to={`/details/${employeeData.id}`}>Edit</Link>
				</button>
				<button className={styles.ButtonsList__Remove} onClick={() => handleDelete(employeeData.id)}>
					Remove
				</button>
			</div>
		</li>
	);
};

export default EmployeeItem;

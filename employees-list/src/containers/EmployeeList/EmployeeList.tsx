import axios from "axios";
import { useContext, useEffect, useState } from "react";
import EmployeeItem from "../../components/EmployeeItem/EmployeeItem";
import { AllEmployeeDataContext } from "../../context/AllEmployeeDataContext";
import styles from "./EmployeeList.module.scss";
import { Employee } from "../../types";

const EmployeeList = () => {
	const { allLocalEmployees, isLoading, hasError } = useContext(AllEmployeeDataContext);
	const [allLocalEmployee, setAllLocalEmployee] = useState([]);
	const [hasMessage, setHasMessage] = useState("");

	useEffect(() => {
		setAllLocalEmployee(allLocalEmployees);
	}, [allLocalEmployees]);

	const handleDelete = (id: number) => {
		axios
			.delete(`/employees/${id}`)
			.then((response) => {
				if (response?.status == 204) {
					const remainingEmployees = allLocalEmployee?.filter((each: Employee) => each.id != id);
					setAllLocalEmployee(remainingEmployees);
					alert(`An employee with id of ${id} has been successfully deleted.`);
				} else {
					throw new Error(`${response.status} error occurred.`);
				}
			})
			.catch((error) => {
				console.log(error);
				alert(`Something went wrong with deleting an employee: ${error}`);
			});

		// try {
		// 	const response = await axios.delete(`/employees/${id}`);
		// 	if (response?.status == 204) {
		// 		alertMessage = `An employee with id of ${id} has been successfully deleted.`;
		// 		const remainingEmployees = allLocalEmployee?.filter((each: Employee) => each.id != id);
		// 		setAllLocalEmployee(remainingEmployees);
		// 	} else {
		// 		throw new Error(`${response.status} error occurred.`);
		// 	}
		// } catch(error) {
		// 	console.log({error});
		// }
	};

	return (
		<ul className={styles.EmployeeList}>
			{isLoading && <p>Loading the employee data...</p>}
			{hasError && <p>There was an error fetching data.</p>}
			{allLocalEmployee && allLocalEmployee?.length > 0 ? (
				allLocalEmployee.map((employee: any, id: React.Key) => {
					return <EmployeeItem employeeData={employee} key={id} handleDelete={handleDelete} />;
				})
			) : (
				<>{!isLoading && !hasError && <p>There is no employee available.</p>}</>
			)}
		</ul>
	);
};

export default EmployeeList;

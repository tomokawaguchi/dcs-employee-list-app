import { useContext, useEffect } from "react";
import { fetchEmployeeData } from "../../api/fetchEmployeeData";
import EmployeeItem from "../../components/EmployeeItem/EmployeeItem";
import { AllEmployeeDataContext } from "../../context/AllEmployeeDataContext";
import styles from "./EmployeeList.module.scss";

const EmployeeList = () => {
	const { allLocalEmployees, setAllLocalEmployees } = useContext(AllEmployeeDataContext);
	const { isLoading, error, data } = fetchEmployeeData();

	useEffect(() => {
		setAllLocalEmployees(data);
	});

	return (
		<ul className={styles.EmployeeList}>
			{isLoading && <p>Loading the employee data...</p>}
			{error && <p>There was an error fetching data.</p>}
			{allLocalEmployees && allLocalEmployees?.length > 0 ? (
				allLocalEmployees.map((employee: any, id: React.Key) => {
					return <EmployeeItem employeeData={employee} key={id} />;
				})
			) : (
				<>{!isLoading && !error && <p>There is no employee available.</p>}</>
			)}
		</ul>
	);
};

export default EmployeeList;

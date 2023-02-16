import { createContext, useEffect, useState } from "react";

interface AllEmployeeDataProviderProps {
	children: React.ReactNode;
}

export const AllEmployeeDataContext = createContext<any>({});

const AllEmployeeDataProvider = (props: AllEmployeeDataProviderProps) => {
	const [allLocalEmployees, setAllLocalEmployees] = useState({
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
		onGoing: false,
	});

	const value = { allLocalEmployees, setAllLocalEmployees };

	return <AllEmployeeDataContext.Provider value={value}>{props.children}</AllEmployeeDataContext.Provider>;
};

export default AllEmployeeDataProvider;

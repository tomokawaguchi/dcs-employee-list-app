import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface AllEmployeeDataProviderProps {
	children: React.ReactNode;
}

export const AllEmployeeDataContext = createContext<any>({});

const AllEmployeeDataProvider = (props: AllEmployeeDataProviderProps) => {
	const [allLocalEmployees, setAllLocalEmployees] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		try {
			axios.get("/employees").then((response) => {
				setAllLocalEmployees(response.data);
				setIsLoading(false);
			});
		} catch (error: any) {
			if (error.response) {
				// Request made but the server responded with an error
				console.log(`${error.response.status} Error: ${error.response.data}`);
				console.log(error.response.headers);
			} else if (error.request) {
				// Request made but no response is received from the server.
				console.log(error.request);
			} else {
				// Error occured while setting up the request
				console.log("Error: ", error.message);
			}

			setHasError(true);
		}
	}, []);

	const value = { allLocalEmployees, setAllLocalEmployees, isLoading, setIsLoading, hasError, setHasError };

	return <AllEmployeeDataContext.Provider value={value}>{props.children}</AllEmployeeDataContext.Provider>;
};

export default AllEmployeeDataProvider;

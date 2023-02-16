import axios from "axios";
import { useQuery } from "react-query";

export function fetchEmployeeData() {
	return useQuery("allEmployeeData", () => axios.get("/employees").then((res) => res.data));
}

export function deleteEmployeeDataById() {
	return useQuery("employeeById", (id) => axios.delete(`/employees/${id}`));
}

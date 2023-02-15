import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, Mocked } from "vitest";
import { BrowserRouter, useParams } from "react-router-dom";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";

vi.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("EmployeeForm component", () => {
	describe("for existing employee", () => {
		it("cancels the screen and go back to home", async () => {
			render(<EmployeeForm />, { wrapper: BrowserRouter });
			const editCancel = screen.getByText("Cancel");
			fireEvent.click(editCancel);
			expect(editCancel.closest("a")).toHaveAttribute("href", `/`);
		});
	});

	// it("should display the employee details form", async () => {
	// 	const employee = {
	// 		id: "1",
	// 		firstName: "Sally",
	// 		middleName: "Risa",
	// 		lastName: "Jones",
	// 		email: "sally@email.com",
	// 		mobile: "1234567890",
	// 		residentialAddress: "123 Happy Rd, VIC",
	// 		contractType: "permanent",
	// 		startDate: "12-09-2011",
	// 		finishDate: "12-12-2025",
	// 		workTimeType: "full-time",
	// 		hoursPerWeek: "38",
	// 		onGoing: false,
	// 	};

	// 	mockAxios.get.mockResolvedValue({ data: employee });

	// 	const { getByLabelText, getByText } = render(<EmployeeForm />, { wrapper: BrowserRouter });

	// 	act(() => {
	// 		expect(axios.get).toHaveBeenCalledWith(`/employees/1`);
	// 	});

	// 	expect(getByLabelText("First name")).toHaveAttribute("value", "Sally");
	// 	expect(getByLabelText("Last name")).toHaveAttribute("value", "Jones");
	// 	expect(getByLabelText("Middle name")).toHaveAttribute("value", "Risa");
	// 	expect(getByLabelText("Email:")).toHaveAttribute("value", "sally@email.com");
	// 	expect(getByLabelText("Mobile number:")).toHaveAttribute("value", "1234567890");
	// 	expect(getByLabelText("Residential address")).toHaveAttribute("value", "123 Happy Rd, VIC");

	// 	const submitButton = getByText("Create");

	// 	(axios.put as jest.Mock).mockResolvedValueOnce({});

	// 	fireEvent.click(submitButton);

	// 	act(() => {
	// 		expect(axios.put).toHaveBeenCalledWith(`/employees/1`, employee);
	// 	});
	// });

	// it("renders the error message when a PUT request returns a 500 error", async () => {
	// 	mockAxios.put.mockImplementationOnce(() =>
	// 		Promise.reject({
	// 			response: {
	// 				status: 500,
	// 			},
	// 		})
	// 	);

	// 	const { getByText } = render(<EmployeeForm />, { wrapper: BrowserRouter });

	// 	// await waitFor(() => expect(axios.get).toHaveBeenCalled());
	// 	await waitFor(() => expect(axios.put).toHaveBeenCalled());

	// 	const errorMessage = getByText("Server Error: There was a problem with the server, please try again later.");
	// 	expect(errorMessage).toBeInTheDocument();
	// });
});

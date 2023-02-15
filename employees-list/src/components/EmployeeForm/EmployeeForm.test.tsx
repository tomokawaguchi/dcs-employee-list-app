import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, Mocked } from "vitest";
import { BrowserRouter } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";

vi.mock("axios");

describe("EmployeeForm component", () => {
	it("cancels the screen and go back to home", async () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const editCancel = screen.getByText("Cancel");
		fireEvent.click(editCancel);
		expect(editCancel.closest("a")).toHaveAttribute("href", `/`);
	});

	// describe("for existing employee", () => {
	// 	it("able to fetch data by employee id", async () => {
	// 		render(<EmployeeForm />, { wrapper: BrowserRouter });

	// 		vi.mock("react-router-dom", async () => {q
	// 			const actual = await vi.importActual("react-router-dom");
	// 			return {
	// 				...(actual as object),
	// 				useParams: vi.fn(() => ({
	// 					id: "123",
	// 				})),
	// 			};
	// 		});

	// 		vi.spyOn(axios, "get").mockResolvedValueOnce({
	// 			data: {
	// 				id: "123",
	// 				firstName: "Sally",
	// 				middleName: "Chen",
	// 				lastName: "Jones",
	// 				email: "sally@email.com",
	// 				mobile: "1234567890",
	// 				residentialAddress: "123 Happy Rd, VIC",
	// 				contractType: "permanent",
	// 				startDate: "12-09-2011",
	// 				finishDate: "12-12-2025",
	// 				workTimeType: "full-time",
	// 				hoursPerWeek: "38",
	// 				onGoing: false,
	// 			},
	// 		});

	// 		const firstName = screen.getByLabelText("First name");

	// 		await waitFor(() => {
	// 			expect(firstName).toHaveAttribute("value", "Sally");
	// 		});
	// 	});
	// });
});

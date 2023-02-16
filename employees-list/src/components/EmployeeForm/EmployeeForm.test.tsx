import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm component", () => {
	it("cancels the screen and go back to home", async () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const editCancel = screen.getByText("Cancel");
		fireEvent.click(editCancel);
		expect(editCancel.closest("a")).toHaveAttribute("href", `/`);
	});

	it("renders the first name input field", () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const firstNameInput = screen.getByLabelText("First name");
		expect(firstNameInput).toBeInTheDocument();
	});

	it("renders the middle name input field", () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const middleNameInput = screen.getByLabelText("Middle name");
		expect(middleNameInput).toBeInTheDocument();
	});

	it("renders the last name input field", () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const lastNameInput = screen.getByLabelText("Last name");
		expect(lastNameInput).toBeInTheDocument();
	});

	it("renders the Email input field", () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const emailInput = screen.getByLabelText("Email address");
		expect(emailInput).toBeInTheDocument();
	});

	it("renders the Mobile number input field", () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const mobileInput = screen.getByLabelText("Mobile number");
		expect(mobileInput).toBeInTheDocument();
	});

	it("renders the Residential address input field", () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const addressInput = screen.getByLabelText("Residential address");
		expect(addressInput).toBeInTheDocument();
	});
});

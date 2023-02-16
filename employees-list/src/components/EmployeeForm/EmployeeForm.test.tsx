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

	it("selects permanent radio button by default", () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const addressInput = screen.getByLabelText("Residential address");
		expect(addressInput).toBeInTheDocument();
	});

	it("Verify that the first radio button is selected and user can select another radio button", () => {
		const { getByRole } = render(<EmployeeForm />, { wrapper: BrowserRouter });
		const permanent = getByRole("radio", { name: "Permanent" });
		const contract = getByRole("radio", { name: "Contract" });
		expect(permanent).toBeChecked();
		fireEvent.click(contract);
		expect(permanent).not.toBeChecked();
		expect(contract).toBeChecked();
	});

	it("should disable Finished date fields when On going checkbox is selected, vice versa", () => {
		render(<EmployeeForm />, { wrapper: BrowserRouter });
		const finishDateInput = screen.getByTestId("finishDateDay");
		const onGoingCheckbox = screen.getByLabelText("On going");

		expect(finishDateInput).not.toHaveAttribute("disabled");
		expect(onGoingCheckbox).not.toBeChecked();
		fireEvent.click(onGoingCheckbox);
		expect(finishDateInput).toHaveAttribute("disabled");
		expect(onGoingCheckbox).toBeChecked();
		fireEvent.click(onGoingCheckbox);
		expect(finishDateInput).not.toHaveAttribute("disabled");
		expect(onGoingCheckbox).not.toBeChecked();
	});
});

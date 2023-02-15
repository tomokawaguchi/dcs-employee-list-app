import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import EmployeeItem from "./EmployeeItem";

vi.mock("axios");

const employee = {
	id: 1,
	firstName: "James",
	middleName: "Smith",
	lastName: "Jackson",
	email: "jsm@gmail.com",
	mobile: "0123456789",
	residentialAddress: "12 Sweet St, NSW",
	contractType: "permanent",
	startDate: "9-04-2020",
	finishDate: "19-07-2026",
	workTimeType: "part-time",
	hoursPerWeek: 40,
	onGoing: false,
};

describe("EmployeeItem component", () => {
	it("deletes an employee and reload the browser", async () => {
		Object.defineProperty(window, "location", {
			value: { reload: vi.fn() },
		});

		render(<EmployeeItem employeeData={employee} />, { wrapper: BrowserRouter });

		fireEvent.click(screen.getByText("Remove"));

		expect(axios.delete).toBeCalledWith(`/employees/${employee.id}`);
		await waitFor(() => {
			expect(window.location.reload).toBeCalled();
		});
	});

	it("edits an employee and takes to  the details/id page", async () => {
		render(<EmployeeItem employeeData={employee} />, { wrapper: BrowserRouter });

		const editLink = screen.getByText("Edit");

		fireEvent.click(editLink);

		expect(editLink.closest("a")).toHaveAttribute("href", `/details/1`);
	});
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

// vi.mock("react-router-dom", async () => {
// 	const actual = await vi.importActual("react-router-dom");
// 	return {
// 		__esModule: true,
// 		...(actual as object),
// 		useParams: () => ({
// 			id: "details",
// 		}),
// 	};
// });

// vi.mock("react-router-dom", () => ({
// 	...jest.requireActual("react-router-dom"),
// 	useLocation: () => ({
// 	  pathname: "localhost:3000/example/path"
// 	})
//   }));

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		__esModule: true,
		...(actual as object),
		useLocation: () => ({
			pathname: "/details",
		}),
	};
});

describe("Header Component", () => {
	it("renders the correct heading", () => {
		render(<Header headerText="Header Text" />, { wrapper: BrowserRouter });
		const heading = screen.getByText("Header Text");
		expect(heading).toBeInTheDocument();
	});

	it("takes back to home page upon click", async () => {
		const { getByText } = render(<Header headerText="Employee details" />, { wrapper: BrowserRouter });

		const backBtn = screen.getByText("Back");

		fireEvent.click(backBtn);

		expect(backBtn.closest("a")).toHaveAttribute("href", "/");
	});
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
	it("renders the correct heading", () => {
		render(<Header headerText="Header Text" />, { wrapper: BrowserRouter });
		const heading = screen.getByText("Header Text");
		expect(heading).toBeInTheDocument();
	});
});

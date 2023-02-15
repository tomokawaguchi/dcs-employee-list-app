import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// Add RTL library matchers to vitest
expect.extend(matchers);

// Clean up after every test - unmount the components every time
afterEach(() => {
	cleanup();
});

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true, // so we don't need to import describe and it every time
		environment: "jsdom",
		setupFiles: "./setup-tests.ts", // path to the config file
	},
});

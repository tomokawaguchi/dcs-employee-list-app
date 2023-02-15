import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import DetailsPage from "./containers/DetailsPage/DetailsPage";
import ListPage from "./containers/ListPage/ListPage";
import { useEffect } from "react";
import axios from "axios";
import AllEmployeeDataProvider from "./context/AllEmployeeDataContext";

const baseUrl = "http://localhost:8080/employees";

const App = () => {
	return (
		<BrowserRouter>
			<AllEmployeeDataProvider>
				<div className={styles.App}>
					{/* Context to inset here */}
					<Header />
					<Routes>
						<Route path="/" element={<ListPage />} />
						<Route path="/details" element={<DetailsPage />} />
						<Route path="/details/:id" element={<DetailsPage />} />
					</Routes>
				</div>
			</AllEmployeeDataProvider>
		</BrowserRouter>
	);
};

export default App;

import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Header from "../../components/Header/Header";

const DetailsPage = () => {
	return (
		<>
			<Header headerText="Employee details" />
			<main>
				<section>
					<EmployeeForm />
				</section>
			</main>
		</>
	);
};

export default DetailsPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./EmployeeForm.module.scss";

const EmployeeForm = () => {
	const { id } = useParams();
	const [currentEmployee, setCurrentEmployee] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		mobile: "",
		residentialAddress: "",
		contractType: "permanent",
		startDate: "",
		finishDate: "",
		workTimeType: "full-time",
		hoursPerWeek: "",
		onGoing: "",
	});

	const [allDates, setAllDates] = useState({
		startDateDay: "",
		startDateMonth: "",
		startDateYear: "",
		finishDateDay: "",
		finishDateMonth: "",
		finishDateYear: "",
	});

	const [isOnGoing, setIsOnGoing] = useState(false);

	useEffect(() => {
		if (id) {
			const fetchEmployee = async () => {
				const filteredEmployee = await axios.get(`/employees/${id}`).then((res) => res.data);
				setCurrentEmployee(filteredEmployee);
				setAllDates({
					startDateDay: filteredEmployee.startDate.slice(0, 2),
					startDateMonth: filteredEmployee.startDate.slice(3).slice(0, 2),
					startDateYear: filteredEmployee.startDate.slice(-4),
					finishDateDay: filteredEmployee.finishDate == null ? "" : filteredEmployee.finishDate.slice(0, 2),
					finishDateMonth: filteredEmployee.finishDate == null ? "01" : filteredEmployee.finishDate.slice(3).slice(0, 2),
					finishDateYear: filteredEmployee.finishDate == null ? "" : filteredEmployee.finishDate.slice(-4),
				});
				setIsOnGoing(filteredEmployee.onGoing);
			};
			fetchEmployee();
		}
	}, [id]);

	const handleDatesChange = (e: { target: { name: any; value: any } }) => {
		setAllDates({ ...allDates, [e.target.name]: e.target.value });
	};

	// Obtaining the inputs from the fields on change
	const handleInputChange = (e: { target: { name: any; value: any } }) => {
		setCurrentEmployee({ ...currentEmployee, [e.target.name]: e.target.value });
	};

	// Handle updating the latest details to currentEmployee
	const formatObj = () => {
		const startDateDayFormat =
			allDates.startDateDay.length == 1 && +allDates.startDateDay > 0
				? `0${allDates.startDateDay}`
				: allDates.startDateDay.length == 2 && +allDates.startDateDay < 32
				? allDates.startDateDay
				: "invalid";

		const startDateYearFormat = allDates.startDateYear.length == 4 ? allDates.startDateYear : "invalid";

		const finishDateDayFormat =
			allDates.finishDateDay.length == 1 && +allDates.finishDateDay > 0
				? `0${allDates.finishDateDay}`
				: allDates.finishDateDay.length == 2 && +allDates.finishDateDay < 32
				? allDates.finishDateDay
				: "invalid";

		const finishDateYearFormat = allDates.finishDateYear.length == 4 ? allDates.finishDateYear : "invalid";

		const finalStartDate = `${startDateDayFormat}-${allDates.startDateMonth}-${startDateYearFormat}`;

		const finalFinishDate = `${finishDateDayFormat}-${allDates.finishDateMonth}-${finishDateYearFormat}`;

		const finalObj = {
			...currentEmployee,
			startDate: finalStartDate.includes("invalid") ? null : finalStartDate,
			finishDate: finalFinishDate.includes("invalid") ? null : finalFinishDate,
			onGoing: isOnGoing,
			middleName: currentEmployee.middleName?.length == 0 ? null : currentEmployee.middleName,
		};

		return finalObj;
	};

	// Handling form submission
	const handleSubmitForm = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const finalObj = formatObj();

		axios.post("/employees", finalObj).then(() => {
			setCurrentEmployee({
				firstName: "",
				middleName: "",
				lastName: "",
				email: "",
				mobile: "",
				residentialAddress: "",
				contractType: "",
				startDate: "",
				finishDate: "",
				workTimeType: "",
				hoursPerWeek: "",
				onGoing: "",
			});

			window.location.href = "/"; // Reload to go back to home
		});
	};

	return (
		<form className={styles.Form} onSubmit={handleSubmitForm}>
			<h2>Personal information</h2>
			<div className={styles.Form__FieldWrapper}>
				<label htmlFor="firstName" placeholder="John">
					First name
				</label>
				<input
					id="firstName"
					type="text"
					name="firstName"
					onChange={handleInputChange}
					value={currentEmployee.firstName}
					pattern="[A-Za-z]{1,30}"
					required
				/>
			</div>
			<div className={styles.Form__FieldWrapper}>
				<label htmlFor="middleName">Middle name</label>
				<input
					id="middleName"
					type="text"
					name="middleName"
					onChange={handleInputChange}
					value={currentEmployee.middleName == null ? "" : currentEmployee.middleName}
					pattern="[A-Za-z]{1,30}"
				/>
			</div>
			<div className={styles.Form__FieldWrapper}>
				<label htmlFor="lastName" placeholder="Smith">
					Last name
				</label>
				<input
					id="lastName"
					type="text"
					name="lastName"
					onChange={handleInputChange}
					value={currentEmployee.lastName}
					pattern="[A-Za-z]{1,30}"
					required
				/>
			</div>

			<h2>Contact details</h2>
			<div className={styles.Form__FieldWrapper}>
				<label htmlFor="email" placeholder="sam.riley@gmail.com">
					Email address
				</label>
				<input id="email" type="email" name="email" onChange={handleInputChange} value={currentEmployee.email} required />
			</div>

			<div className={styles.Form__FieldWrapper}>
				<label htmlFor="mobile" placeholder="0412345678">
					Mobile number
				</label>
				<input id="mobile" type="tel" name="mobile" pattern="[0-9]{10}" onChange={handleInputChange} value={currentEmployee.mobile} required />
			</div>
			<div className={styles.Form__FieldWrapper}>
				<label htmlFor="residentialAddress" placeholder="Smith">
					Residential address
				</label>
				<input
					id="residentialAddress"
					type="text"
					name="residentialAddress"
					onChange={handleInputChange}
					value={currentEmployee.residentialAddress}
					pattern="[A-Za-z]{1,100}"
					required
				/>
			</div>

			<h2>Employee status</h2>
			<p>What is contract type?</p>
			<div className={`${styles.Form__FieldWrapper} ${styles.Form__RadioCheck}`}>
				<input
					id="permanent"
					type="radio"
					name="contractType"
					value="permanent"
					onChange={handleInputChange}
					checked={currentEmployee.contractType.toLowerCase() == "permanent" ? true : currentEmployee.contractType.length == 0 ? true : false}
				/>
				<label htmlFor="permanent">Permanent</label>
			</div>
			<div className={`${styles.Form__FieldWrapper} ${styles.Form__RadioCheck}`}>
				<input
					id="contract"
					type="radio"
					name="contractType"
					value="contract"
					onChange={handleInputChange}
					checked={currentEmployee.contractType.toLowerCase() === "contract" ? true : false}
				/>
				<label htmlFor="contract">Contract</label>
			</div>

			<p>Start date</p>
			<div className={styles.Form__DateFieldsWrapper}>
				<div className={styles.Form__FieldWrapper}>
					<label htmlFor="startDateDay" placeholder="28">
						Day
					</label>
					<input
						id="startDateDay"
						type="number"
						name="startDateDay"
						value={allDates.startDateDay}
						onChange={handleDatesChange}
						min={1}
						max={31}
						required
					/>
				</div>
				<div className={`${styles.Form__FieldWrapper} ${styles.Form__SelectMonth}`}>
					<label>Month</label>
					<select name="startDateMonth" onChange={handleDatesChange} value={allDates.startDateMonth}>
						<option value="01">January</option>
						<option value="02">February</option>
						<option value="03">March</option>
						<option value="04">April</option>
						<option value="05">May</option>
						<option value="06">June</option>
						<option value="07">July</option>
						<option value="08">August</option>
						<option value="09">September</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</select>
				</div>

				<div className={styles.Form__FieldWrapper}>
					<label htmlFor="startDateYear" placeholder="2021">
						Year
					</label>
					<input
						id="startDateYear"
						type="number"
						min={new Date().getFullYear() - 80}
						max={new Date().getFullYear()}
						name="startDateYear"
						onChange={handleDatesChange}
						value={allDates.startDateYear}
						required
					/>
				</div>
			</div>

			<p>Finish date</p>
			<div className={styles.Form__DateFieldsWrapper}>
				<div className={styles.Form__FieldWrapper}>
					<label htmlFor="finishDateDay" placeholder="28">
						Day
					</label>
					<input
						id="finishDateDay"
						type="number"
						name="finishDateDay"
						onChange={handleDatesChange}
						value={allDates.finishDateDay}
						disabled={isOnGoing ? true : false}
						min={1}
						max={31}
						data-testid="finishDateDay"
						required
					/>
				</div>
				<div className={`${styles.Form__FieldWrapper} ${styles.Form__SelectMonth}`}>
					<label id="finishDateMonth">Month</label>
					<select name="finishDateMonth" onChange={handleDatesChange} value={allDates.finishDateMonth} disabled={isOnGoing ? true : false}>
						<option value="01">January</option>
						<option value="02">February</option>
						<option value="03">March</option>
						<option value="04">April</option>
						<option value="05">May</option>
						<option value="06">June</option>
						<option value="07">July</option>
						<option value="08">August</option>
						<option value="09">September</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</select>
				</div>

				<div className={styles.Form__FieldWrapper}>
					<label htmlFor="finishDateYear" placeholder="2021">
						Year
					</label>
					<input
						type="number"
						name="finishDateYear"
						onChange={handleDatesChange}
						value={allDates.finishDateYear}
						disabled={isOnGoing ? true : false}
						min={new Date().getFullYear()}
						max={new Date().getFullYear() + 80}
						required
					/>
				</div>
			</div>
			<div className={`${styles.Form__FieldWrapper} ${styles.Form__RadioCheck}`}>
				<input
					id="onGoing"
					type="checkbox"
					onChange={(e) => (e.target.checked ? setIsOnGoing(true) : setIsOnGoing(false))}
					checked={isOnGoing ? true : false}
				/>
				<label htmlFor="onGoing">On going</label>
			</div>

			<p>Is this on a full-time or part-time basis?</p>
			<div className={`${styles.Form__FieldWrapper} ${styles.Form__RadioCheck}`}>
				<input
					id="fullTime"
					type="radio"
					name="workTimeType"
					value="full-time"
					onChange={handleInputChange}
					checked={currentEmployee.workTimeType.toLowerCase() == "full-time" ? true : currentEmployee.workTimeType.length == 0 ? true : false}
				/>
				<label htmlFor="fullTime">Full-time</label>
			</div>
			<div className={`${styles.Form__FieldWrapper} ${styles.Form__RadioCheck}`}>
				<input
					id="partTime"
					type="radio"
					name="workTimeType"
					value="part-time"
					onChange={handleInputChange}
					checked={currentEmployee.workTimeType.toLowerCase() == "part-time" ? true : false}
				/>
				<label htmlFor="partTime">Part-time</label>
			</div>

			<div className={`${styles.Form__FieldWrapper} ${styles.Form__HoursPerWeek}`}>
				<label htmlFor="hoursPerWeek" placeholder="Smith">
					Hours per week
				</label>
				<input
					id="hoursPerWeek"
					type="number"
					name="hoursPerWeek"
					onChange={handleInputChange}
					value={currentEmployee.hoursPerWeek}
					min={1}
					max={40}
					required
				/>
			</div>

			{/* For the buttons */}
			<div className={styles.Form__ButtonsWrapper}>
				<Button type={"submit"} buttonText={id ? "Save" : "Create"} buttonStyle="primary" />
				<Link to={`/`}>
					<Button buttonText="Cancel" buttonStyle="secondary" />
				</Link>
			</div>
		</form>
	);
};

export default EmployeeForm;

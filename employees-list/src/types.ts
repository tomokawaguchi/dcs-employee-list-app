export interface Employee {
	id: number;
	firstName: string;
	middleName?: string;
	lastName: string;
	email: string;
	mobile: string;
	residentialAddress: string;
	contractType: string;
	startDate: string;
	finishDate?: string;
	workTimeType: string;
	hoursPerWeek: number;
	onGoing: boolean;
}

export interface ButtonProps {
	type?: "button" | "submit" | "reset" | undefined;
	buttonText: String;
	buttonStyle: String;
	onClick?: () => void;
}

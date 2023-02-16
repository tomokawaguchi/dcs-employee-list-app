import { ButtonProps } from "../../types";
import styles from "./Button.module.scss";

const Button = ({ buttonText, buttonStyle, type = "button", onClick }: ButtonProps) => {
	const classes = buttonStyle === "primary" ? [`${styles.Button}`] : [`${styles.Button} ${styles.Button__Secondary}`];
	return (
		<button type={type} className={classes.join(" ")} {...(onClick || {})}>
			{buttonText}
		</button>
	);
};

export default Button;

import { FC, memo, ReactNode } from "react";

import styles from "./button.module.scss";

type buttonProps = {
	label: string | ReactNode;
	className?: string;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	onClick?: () => void;
};

export const Button: FC<buttonProps> = memo(
	({ label, className, onClick, type, disabled }) => {
		return (
			<button
				type={type || "button"}
				className={`${styles.button} ${className || ""}`}
				onClick={onClick}
				disabled={disabled || false}
			>
				{label}
			</button>
		);
	}
);

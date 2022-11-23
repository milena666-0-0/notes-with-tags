import { FC } from "react";

import styles from "./tag.module.scss";

type tagProps = {
	text: string;
	id: string;
	handleDeleteTag: (id: string) => void;
};

export const Tag: FC<tagProps> = ({ text, id, handleDeleteTag }) => {
	return (
		<div className={styles.tag}>
			<div className={styles.tag__text_container}>
				<p className={styles.tag__text}>{text}</p>
			</div>
			<div className={styles.tag__btns}>
				<div
					className={styles.tag__button}
					onClick={() => handleDeleteTag(id)}
				>
					<i className="fa-solid fa-trash" />
				</div>
			</div>
		</div>
	);
};

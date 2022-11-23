import { FC, ChangeEvent } from "react";
import ReactHashtag from "react-hashtag";

import styles from "./note.module.scss";

type editableAreaProps = {
	text: string;
	handleChangeNote: (e: ChangeEvent<HTMLDivElement>) => void;
};

export const EditableArea: FC<editableAreaProps> = ({
	text,
	handleChangeNote,
}) => {
	return (
		<div
			className={styles.note__textarea}
			onInput={handleChangeNote}
			contentEditable
			suppressContentEditableWarning
		>
			<ReactHashtag>{text}</ReactHashtag>
		</div>
	);
};

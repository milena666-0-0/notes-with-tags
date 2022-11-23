import { FC, useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { EditableArea } from "./EditableArea";
import { setFunc, note } from "types/noteType";

import styles from "./note.module.scss";

type noteProps = {
	text: string;
	id: string;
	handleDeleteNote: (id: string) => void;
	handleUpdateNote: (text: string, id: string) => void;
	setTags: setFunc<note[]>;
};

export const Note: FC<noteProps> = ({
	text,
	id,
	handleDeleteNote,
	handleUpdateNote,
	setTags,
}) => {
	const [note, setNote] = useState<string>(text);
	const [editMode, setEditMode] = useState<boolean>(false);

	const handleSetEditMode = () => {
		setEditMode(true);
	};

	const handleUnsetEditMode = () => {
		setEditMode(false);
		handleUpdateNote(note, id);

		const tags = note
			.trim()
			.split(" ")
			.filter((tag) => !text.includes(tag) && tag.startsWith("#"));

		const newTags = tags.map((tag) => ({ id: uuidv4(), text: tag }));

		newTags.length > 0 && setTags((prevTags) => [...newTags, ...prevTags]);
	};

	const handleChangeNote = (e: ChangeEvent<HTMLDivElement>) => {
		setNote(e.target.innerText);
	};

	return (
		<div className={`${styles.note} ${editMode ? styles.note_focused : ""}`}>
			<div className={styles.note__text_container}>
				{editMode ? (
					<EditableArea
						text={text}
						handleChangeNote={handleChangeNote}
					/>
				) : (
					<p className={styles.note__text}>{note}</p>
				)}
			</div>
			<div className={styles.note__btns}>
				{editMode ? (
					<div
						className={styles.note__button}
						onClick={handleUnsetEditMode}
					>
						<i className="fa-solid fa-check" />
					</div>
				) : (
					<div
						className={styles.note__button}
						onClick={handleSetEditMode}
					>
						<i className="fa-solid fa-pen-to-square" />
					</div>
				)}

				<div
					className={styles.note__button}
					onClick={() => handleDeleteNote(id)}
				>
					<i className="fa-solid fa-trash" />
				</div>
			</div>
		</div>
	);
};

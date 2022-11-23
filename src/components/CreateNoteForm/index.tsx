import { FC, useState, ChangeEvent, FormEvent, memo } from "react";
import { v4 as uuidv4 } from "uuid";

import { note, setFunc } from "types/noteType";
import { Button } from "components/Button";

import styles from "./create_form.module.scss";

type createNoteFormProps = {
	setNotes: setFunc<note[]>;
	setTags: setFunc<note[]>;
};

export const CreateNoteForm: FC<createNoteFormProps> = memo(
	({ setNotes, setTags }) => {
		const [noteTerm, setNoteTerm] = useState<string>("");

		const handleChangeTerm = (e: ChangeEvent<HTMLTextAreaElement>) => {
			setNoteTerm(e.target.value);
		};

		const handleCreateNote = () => {
			const newNote = {
				id: uuidv4(),
				text: noteTerm,
			};

			const tags = noteTerm
				.trim()
				.split(" ")
				.filter((note) => note.startsWith("#"));

			const newTags = tags.map((tag) => ({ id: uuidv4(), text: tag }));

			newTags.length > 0 && setTags((tags) => [...newTags, ...tags]);

			noteTerm.trim().split(" ").length !== tags.length && setNotes((notes) => [newNote, ...notes]);

			setNoteTerm("");
		};

		const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			handleCreateNote();
		};

		return (
			<form className={styles.form} onSubmit={handleSubmit}>
				<textarea
					className={styles.form__input}
					placeholder="Write something..."
					value={noteTerm}
					onChange={handleChangeTerm}
				/>
				<Button
					label="Create"
					type="submit"
					disabled={noteTerm.length < 1}
				/>
			</form>
		);
	}
);

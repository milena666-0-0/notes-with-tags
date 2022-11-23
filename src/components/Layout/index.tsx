import { FC, useState, useCallback, useEffect } from "react";

import { NotesList } from "components/NotesList";
import { TagsList } from "components/TagsList";
import { CreateNoteForm } from "components/CreateNoteForm";
import { SearchInput } from "components/SearchInput";
import { note } from "types/noteType";

import styles from "pages/Main/styles.module.scss";

export const Layout: FC = () => {
	const cashedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
	const cashedTags = JSON.parse(localStorage.getItem("tags") || "[]");

	const [notes, setNotes] = useState<note[]>(cashedNotes);
	const [tags, setTags] = useState<note[]>(cashedTags);

	const [filteredNotes, setFilteredNotes] = useState<note[]>(notes);

	const handleDeleteNote = useCallback((id: string) => {
		const newNotesList = notes.filter((note) => note.id !== id);

		setNotes(newNotesList);
	}, [notes]);

	const handleDeleteTag = useCallback((id: string) => {
		const newTagsList = tags.filter((tag) => tag.id !== id);

		setTags(newTagsList);
	}, [tags]);

	const handleUpdateNote = useCallback((text: string, id: string) => {
		const copy = [...notes];

		const noteToChange = copy.find((note) => note.id === id);

		noteToChange!.text = text;

		setNotes(copy);
	}, [notes]);

	useEffect(() => {
		localStorage.setItem("tags", JSON.stringify(tags));
	}, [tags]);

	useEffect(() => {
		setFilteredNotes(notes);
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	return (
		<>
			<CreateNoteForm setNotes={setNotes} setTags={setTags} />
			<SearchInput notes={notes} setFilteredNotes={setFilteredNotes} />

			{tags.length || notes.length ? (
				<div className={styles.main__notes}>
					<NotesList
						notes={filteredNotes}
						handleUpdateNote={handleUpdateNote}
						handleDeleteNote={handleDeleteNote}
						setTags={setTags}
					/>
					<TagsList
						tags={tags}
						handleDeleteTag={handleDeleteTag}
					/>
				</div>
			) : (
				<span className={styles.main__span}>Nothing to see</span>
			)}
		</>
	);
};

import { FC, memo } from "react";

import { note, setFunc } from "types/noteType";
import { Note } from "components/Note";

type notesListProps = {
	notes: note[];
	handleDeleteNote: (id: string) => void;
	handleUpdateNote: (text: string, id: string) => void;
	setTags: setFunc<note[]>;
};

export const NotesList: FC<notesListProps> = memo(
	({ notes, handleDeleteNote, handleUpdateNote, setTags }) => {
		return (
			<div>
				{notes?.map(({ id, text }) => (
					<Note
						key={id}
						text={text}
						id={id}
						setTags={setTags}
						handleUpdateNote={handleUpdateNote}
						handleDeleteNote={handleDeleteNote}
					/>
				))}
			</div>
		);
	}
);

import { FC, useState, ChangeEvent, useEffect, memo, useCallback } from "react";

import { note, setFunc } from "types/noteType";

import styles from "./search_input.module.scss";

type searchInputProps = {
	notes: note[];
	setFilteredNotes: setFunc<note[]>;
};

export const SearchInput: FC<searchInputProps> = memo(({ notes, setFilteredNotes }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const filterTags = useCallback((term: string, data: note[]) => {
		if (!term.length) {
			return data;
		}

		return data.filter(({ text }) =>
			text.toLowerCase().includes('#') && text.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm]);

	useEffect(() => {
		const debounced = setTimeout(() => {
			const filteredTags = filterTags(searchTerm, notes);

			setFilteredNotes(filteredTags);
		}, 500);

		return () => {
			clearTimeout(debounced);
		};
	}, [searchTerm, notes, setFilteredNotes, filterTags]);

	return (
		<form className={styles.form}>
			<input
				className={styles.form__input}
				placeholder="Search..."
				value={searchTerm}
				onChange={handleChange}
			/>
		</form>
	);
});

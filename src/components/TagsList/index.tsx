import { FC, memo } from "react";

import { Tag } from "components/Tag";
import { note } from "types/noteType";

type tagsListProps = {
	tags: note[];
	handleDeleteTag: (id: string) => void;
};

export const TagsList: FC<tagsListProps> = memo(({ tags, handleDeleteTag }) => {
	return (
		<div>
			{tags?.map(({ text, id }) => (
				<Tag
					key={id}
					text={text}
					id={id}
					handleDeleteTag={handleDeleteTag}
				/>
			))}
		</div>
	);
});

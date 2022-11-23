import { FC } from "react";

import { Layout } from "components/Layout";

import styles from "./styles.module.scss";

export const Main: FC = () => {
	return (
		<main className={styles.main}>
			<div className={styles.main__content}>
				<h1 className={styles.main__title}>Welcome to editor</h1>
				<Layout />
			</div>
		</main>
	);
};

export type note = {
	id: string;
	text: string;
};

export type setFunc<T> = (data: T |( (data: T) => T)) => void


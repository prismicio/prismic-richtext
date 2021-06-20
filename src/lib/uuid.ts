interface UUIDFn {
	(): string;
	i: number;
}

export const uuid: UUIDFn = (): string => {
	return (++uuid.i).toString();
};
uuid.i = 0;

interface query<T> {
    found: number;
    payload: T[];
}

export default query;
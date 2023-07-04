interface message<T> {
    status: string;
    message: string;
    payload: T
}

export default message;
export type ResponseDTO<T> = {
    message: string;
    status: number;
    error: string;
    data: T;
}
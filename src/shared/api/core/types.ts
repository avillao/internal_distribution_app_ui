export interface ResponseDTO<T> {
    message: string;
    status: number;
    error: string;
    data: T;
}
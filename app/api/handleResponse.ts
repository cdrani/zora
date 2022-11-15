export interface APIResponse<T> {
    status: number;
    payload: T | null;
    message: string | null;
}

export default async function handleResponse<T>(
    response: Response
): Promise<APIResponse<T>> {
    const resJSON = (await response.json()) as APIResponse<T>;

    const result: APIResponse<T> = {
        status: resJSON.status,
        payload: resJSON?.payload,
        message: resJSON?.message,
    };

    return result;
}

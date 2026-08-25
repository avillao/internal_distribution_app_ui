import { createHttpClient } from '../core/httpClient';

export const authClient = createHttpClient(process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? "");
// api/core/tokenStorage.ts
let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (tokens: { access: string; refresh: string, expires_in: number }) => {
  accessToken = tokens.access;
  refreshToken = tokens.refresh;

  const expiresAt = Date.now() + tokens.expires_in * 1000;

  // opcional persistencia
  sessionStorage.setItem('access_token', tokens.access);
  sessionStorage.setItem('refresh_token', tokens.refresh);
  sessionStorage.setItem('expires_at', expiresAt.toString());
};

export const getAccessToken = () => {
  return accessToken || sessionStorage.getItem('access_token');
};

export const getRefreshToken = () => {
  return refreshToken || sessionStorage.getItem('refresh_token');
};

export const isTokenExpired = () => {
  const expiresAt = sessionStorage.getItem('expires_at');

  if (!expiresAt) return true;

  return Date.now() > Number(expiresAt) * 1000;
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
};
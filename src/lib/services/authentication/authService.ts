import { getCookie } from '@/src/lib/services/authentication/cookieService';

async function getAccessToken(): Promise<string | null> {
    return await getCookie('accessToken');
}

async function isLoggedIn(): Promise<boolean> {
    const refreshToken = await getCookie('refreshToken');
    return !!refreshToken;
}

async function refreshTokens(): Promise<void> {
    const response = await fetch("https://localhost:7186/auth/refresh", {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to refresh tokens");
    }
}

export async function ensureAccessToken(): Promise<string | null> {
    let accessToken = await getAccessToken();

    if (!accessToken) {
        if (await isLoggedIn()) {
            try {
                await refreshTokens();
                accessToken = await getAccessToken();
            } catch (error) {
                console.log('Token refresh failed:', error);
                accessToken = null;
            }
        }
    }

    return accessToken;
}
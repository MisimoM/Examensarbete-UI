export async function refreshTokens() {
    try {
      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await refreshResponse.json();
      sessionStorage.setItem("accessToken", data.accessToken);
  
      return refreshResponse.ok;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return false;
    }
}
export async function refreshTokens() {

    const response = await fetch("https://localhost:7186/auth/refresh", {
        method: "POST",
        credentials: "include",
    });

    console.log("Refresh response status:", response.status);
    console.log("Refresh response headers:", response.headers);

    if (!response.ok) {
        throw new Error("Failed to refresh tokens");
    }
}
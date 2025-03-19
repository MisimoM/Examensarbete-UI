import { jwtDecode } from "jwt-decode";

const isAccessTokenValid = (token: string): boolean => {
  if (!token) return false;

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return false;
  }
};

export const getValidAccessToken = async (): Promise<string | false> => {
  let accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && isAccessTokenValid(accessToken)) {
    return accessToken;
  }

  console.log("Access token is expired or missing. Trying to refresh...");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    sessionStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } else {
    return false;
  }
};
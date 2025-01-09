'use server'

import { cookies } from "next/headers";

export async function isLoggedIn(): Promise<boolean> {
    try {
        const refreshToken = (await cookies()).get('refreshToken')?.value

        return !!refreshToken;
    } catch (error) {
        console.error("Failed to authenticate:", error);
        return false;
    }
}
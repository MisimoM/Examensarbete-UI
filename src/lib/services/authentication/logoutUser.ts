'use server';

import { cookies } from 'next/headers';

export async function logoutUser(): Promise<void> {
    try {
        // Ta bort accessToken och refreshToken från cookies
        await (await cookies()).delete('accessToken');
        await (await cookies()).delete('refreshToken');
        console.log("Cookies successfully deleted. User logged out.");
    } catch (error) {
        console.error("Error clearing cookies:", error);
    }
}
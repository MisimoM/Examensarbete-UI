'use server';

import { cookies } from 'next/headers';

export async function logoutUser(): Promise<void> {
    try {
        (await cookies()).delete('refreshToken');
        console.log("Cookies successfully deleted. User logged out.");
    } catch (error) {
        console.error("Error clearing cookies:", error);
    }
}
'use server'

import { cookies } from 'next/headers';

export async function getCookie(name: string): Promise<string | null> {
    const cookieValue = (await cookies()).get(name)?.value;
    return cookieValue || null;
}
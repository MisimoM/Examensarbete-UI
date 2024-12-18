import { cookies } from "next/headers"
import { decrypt } from "@/src/lib/tokenUtils"

export async function isLoggedIn(): Promise<boolean> {
    try {
        const cookie = (await cookies()).get('accessToken')?.value
        
        if(!cookie) return false

        const session = await decrypt(cookie)

        if(session) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.error("Failed to authenticate:", error);
        return false;
    }
}
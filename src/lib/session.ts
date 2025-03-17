import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

type SessionData = {
    userId: string
    email: string
    first_name: string
    last_name: string
    expiresAt: number
}

export async function createSession(userId: string, email: string,first_name: string,last_name: string) {
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;

    const session = await new SignJWT({ userId, email, first_name,last_name, expiresAt })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(encodedKey)

    const cookieStore = await cookies()
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(expiresAt),
        path: "/",
    })

    return session
}

export async function getSession() {
    const cookieStore = await cookies()
    const session =  cookieStore.get("session")

    if (!session) {
        return null
    }

    try {
        const { payload } = await jwtVerify(session.value, encodedKey, {
            algorithms: ["HS256"],
        })
        return payload as SessionData
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}
export async function getSessionData(): Promise<SessionData | null> {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session) {
        return null
    }

    try {
        const { payload } = await jwtVerify(session.value, new TextEncoder().encode(process.env.SESSION_SECRET), {
            algorithms: ["HS256"],
        })
        return payload as SessionData
    } catch (error) {
        console.log(error)
        return null
    }
}

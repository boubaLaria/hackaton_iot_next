import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "./lib/session";

const protectedRoutes = ["/", "/account","/api",]


function isProtectedPath(path: string) {
    if (protectedRoutes.includes(path)) {
        return true
    }


    for (const route of protectedRoutes) {
        if (route !== "/" && path.startsWith(route + "/")) {
            return true
        }
    }

    return false
}

export async function middleware(request: NextRequest) {
    if (isProtectedPath(request.nextUrl.pathname) && !request.nextUrl.pathname.startsWith("/api/public")) {
        const session = await getSession()

        if (!session) {
            if (request.nextUrl.pathname === "/") {
                return NextResponse.redirect(new URL("/login", request.url))
            }
            else if (request.nextUrl.pathname.startsWith("/api/")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            else {
                return NextResponse.redirect(new URL("/error401", request.url))
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/account/:path*","/api/:path*","/contact-us/:path*","/contact-us/","/contact-us-confirme","/faq/:path*","/support","/offers/:path*"],
}
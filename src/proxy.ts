import { NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;
    const pathname = req.nextUrl.pathname;

    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}
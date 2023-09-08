import {VerifyToken} from "@/app/utility/JWTHelper";
import { NextResponse } from "next/server";

export async function CheckCookieAuth(req) {

    try {
        let token = req.cookies.get('token');
        let payload= await VerifyToken(token.value)
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('email', payload['email'])
        return NextResponse.next({
            request: {headers: requestHeaders},
        })
    }
    catch (e) {
        return NextResponse.redirect(new URL('/', req.url))
    }
}

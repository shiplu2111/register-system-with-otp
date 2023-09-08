import {CheckCookieAuth} from "@/app/utility/MiddlewareUtility";
export async function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return await CheckCookieAuth(req)
    }
}



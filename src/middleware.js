import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server'
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ['/']


});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


// export function middleware(request){
//   const response = NextResponse.next();

// response.headers.set('Access-Control-Allow-Origin', '*')
// response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
// response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
// response.headers.set('Access-Control-Allow-Origin', '86400')
// console.log('Middleware')
// console.log(request.method)
// console.log(request.url)

// return response

// }
















// Resource: https://clerk.com/docs/nextjs/middleware#auth-middleware

import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server'
// export default authMiddleware({
//   // An array of public routes that don't require authentication.
//   publicRoutes: ["/api/webhook/clerk"],

//   // An array of routes to be ignored by the authentication middleware.
//   ignoredRoutes: ["/api/webhook/clerk"],




  
// }

// );


export default authMiddleware({
  publicRoutes: ["/"],
});






export function middleware(request: Request){
  const response = NextResponse.next();

response.headers.set('Access-Control-Allow-Origin', '*')
response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
response.headers.set('Access-Control-Allow-Origin', '86400')
console.log('Middleware')
console.log(request.method)
console.log(request.url)

return response

}

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };






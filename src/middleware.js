export {default} from 'next-auth/middleware';

// remove /api and /login from middleware
// /api have to protect by server side Session
// all pages not pass check session success or not
export const config = {
  matcher:["/((?!api|login).*)"]
}
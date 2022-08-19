//login
/*
The JWT middleware uses the express-jwt library to validate JWT tokens in requests 
sent to protected API routes, if a token is invalid an error is thrown which causes 
the global error handler to return a 401 Unauthorized response. The middleware is 
added to the Next.js request pipeline in the API handler wrapper function.
The register and authenticate routes are made public by passing them to the unless() 
method of the express-jwt library. For more info on express-jwt see https://www.npmjs.com/package/express-jwt.
*/
const expressJwt = require("express-jwt");
const util = require("util");
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
  const middleware = expressJwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/users/register",
      "/api/users/authenticate",
    ],
  });

  return util.promisify(middleware)(req, res);
}

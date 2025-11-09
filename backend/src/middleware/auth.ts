// middleware/auth.ts
import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN!;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE!;

console.log("🔧 Auth Config:", {
  domain: AUTH0_DOMAIN,
  audience: AUTH0_AUDIENCE,
});

// Add this BEFORE checkJwt
export const debugToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  console.log("\n🔍 === TOKEN DEBUG ===");
  console.log("Authorization Header:", authHeader);

  if (authHeader) {
    const parts = authHeader.split(" ");
    console.log("Header parts:", parts.length);
    console.log("Scheme:", parts[0]);

    if (parts[1]) {
      const token = parts[1];
      console.log("Token length:", token.length);
      console.log("Token parts (dots):", token.split(".").length);
      console.log("First 100 chars:", token.substring(0, 100));

      // Check if it's a valid JWT structure
      if (token.split(".").length === 3) {
        console.log("✅ Token has 3 parts (valid JWT structure)");
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          console.log("Token payload:", JSON.stringify(payload, null, 2));
        } catch (e) {
          console.log("❌ Cannot decode payload");
        }
      } else {
        console.log("❌ Token does NOT have 3 parts (invalid JWT)");
      }
    }
  } else {
    console.log("❌ No Authorization header");
  }
  console.log("===================\n");

  next();
};

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

export const addUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // if (req.auth) {
  //   req.user = {
  //     sub: req.auth.sub,
  //     email: req.auth.email || req.auth[`${AUTH0_AUDIENCE}/email`]
  //   };
  // }
  next();
};

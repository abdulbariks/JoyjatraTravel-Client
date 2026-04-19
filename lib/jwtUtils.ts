// /* eslint-disable @typescript-eslint/no-explicit-any */
// import jwt, { JwtPayload } from "jsonwebtoken";

// const verifyToken = (token: string, secret: string) => {
//   try {
//     const decoded = jwt.verify(token, secret) as JwtPayload;
//     return {
//       success: true,
//       data: decoded,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error.message,
//       error,
//     };
//   }
// };

// const decodedToken = (token: string) => {
//   const decoded = jwt.decode(token) as JwtPayload;
//   return decoded;
// };

// export const jwtUtils = {
//   verifyToken,
//   decodedToken,
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/jwtUtils.ts
import { log } from "console";
import { jwtVerify } from "jose";

export const jwtUtils = {
  verifyToken: async (token: string, secret: string) => {
    try {
      // If the backend used a raw string, this is correct:
      const encodedSecret = new TextEncoder().encode(secret);

      const { payload } = await jwtVerify(token, encodedSecret);

      console.log("Decoded JWT Payload:", payload);

      return {
        success: true,
        data: payload,
      };
    } catch (error: any) {
      // Helpful for debugging
      console.error("Jose Verification Error:", error.code, error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

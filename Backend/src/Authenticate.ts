import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
let JWT_SECRET = process.env.JWT_SECRET as string;
export function Auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers["authorization"];
  console.log("header is ", header);

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "No token provided or invalid format",
    });
  }

  const token = header.replace("Bearer ", "");
  console.log("token is ", token);

  try {
    const decode = jwt.verify(token, JWT_SECRET) as { id: string };
    //@ts-ignore
    req.userid = decode.id;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

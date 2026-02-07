import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
let JWT_SECRET= process.env.JWT_SECRET as string;
export function Auth (req:Request,res:Response,next:NextFunction) {
    const header=req.headers["authorization"];
    console.log("header is ", header);
    const decode =jwt.verify(header as string,JWT_SECRET) as {id:string} | null;

    if(decode){
        //@ts-ignore
        req.userid=decode.id
        next()
    }else{
        res.status(403).json({
            message:"you are not logged in "
        })
    }

}

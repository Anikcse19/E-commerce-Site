import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";

export default async function handler(req,res){


    if(req.method=='POST'){
        await mongooseConnect()

        const {email}=req.body

        const existsUser=await User.findOne({email}).select("_id")

        console.log('exists user',existsUser)
        res.status(200).json(existsUser)
    }
}
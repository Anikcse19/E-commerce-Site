import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user"
import bcrypt from "bcryptjs"

export default async function handler(req,res){

    if(req.method=='POST'){
        

        // console.log(name,email,password)
        try{
            const {name,email,password}=req.body
            console.log('api hit',password)
            await mongooseConnect();

            const hashedpass=await bcrypt.hash(password,10)
            console.log('hashedPass',hashedpass)

            const userDoc= await User.create({name,email,password:hashedpass})
            console.log(userDoc)

            res.json({message:'user registered'},{status:200})

        }catch(error){
            res.json({message:'Error occured during registration'})
        }
    }

}
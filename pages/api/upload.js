import { mongooseConnect } from "@/lib/mongoose"
import { isAdminRequest } from "./auth/[...nextauth]"
import { Product } from "@/models/Product"



export default async function handle(req,res){
    

    console.log('api hittt')

    const {method}=req
    await mongooseConnect()
    // await isAdminRequest(req,res)

    if(method=='POST'){
        const {url,title,price}=req.body
        
        const productDoc=await Product.create({url,title,price})
        console.log('imgurl',productDoc)
       res.send(productDoc)
    }
   
}


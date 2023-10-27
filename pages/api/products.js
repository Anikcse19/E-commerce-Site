import clientPromise from "@/lib/mongodb"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import mongoose from "mongoose"
import { isAdminRequest } from "./auth/[...nextauth]"

export default async function handle(req, res) {

   
    const {method}=req
    await mongooseConnect()
    await isAdminRequest(req,res)


    if(method === 'GET'){

        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query?.id}))
        }
        else{

            res.json(await Product.find())
        }
    }
    if(method=='POST'){
        const {title,description, price,category,properties,url}=req.body
        console.log('from server',title,description,price)
        const productDoc=await Product.create({
            title, description, price,category,properties,url
        })
       res.send(productDoc)
    }

    if(method==='PUT'){
        const {title,description, price,category,properties,url,_id}=req.body
        console.log('from server',title,description,price)
       await Product.updateOne({_id},{title,description,price,category,url,properties})
       res.json(true)
        }

    if(method==='DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }
 
  }
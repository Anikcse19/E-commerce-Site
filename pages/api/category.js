import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"
import { isAdminRequest } from "./auth/[...nextauth]"

export default async function handle(req, res){
    const {method}=req

    await mongooseConnect()
    // await isAdminRequest(req,res)
    
    
    if(method =='POST'){

        console.log('post here')
        const {name,parentCategory,properties}=req.body
        console.log(req.body)

       
       const categoryDoc= await Category.create({name,parentCategory,properties})
       res.send(categoryDoc)
    }

    if(method == 'GET'){
        
        const data=await Category.find({}).populate('parentCategory')
        
        res.send(data)
    }

    if(method=='PUT'){
        const {name,parentCategory,_id,properties}=req.body
        
        await Category.updateOne({_id},{
            name, parentCategory, properties
        })

    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('ok');
      }
}
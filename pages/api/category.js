import { Category } from "@/models/Category"

export default async function handle(req, res){
    const {method}=req

    console.log('aschii')
    
    if(method =='POST'){

        console.log('14556')
        const {name}=req.body

       const categoryDoc= await Category.create({name})
       res.send(categoryDoc)
    }

    if(method == 'GET'){
        const data=await Category.find({})
        res.send(data)
    }
}
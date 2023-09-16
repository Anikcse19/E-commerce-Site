import ProductFrom from '@/components/ProductFrom'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from "@/components/Layout"
import React, { useEffect, useState } from 'react'

const EditProductPage = () => {

    const router=useRouter()
    const {id}=router.query

    const [productInfo, setProductInfo]=useState(null)

    useEffect(()=>{

      if(!id){
        return
      }
        axios.get('/api/products?id='+id).then(res=>{
          console.log(res.data)
         setProductInfo(res.data)
        })
    },[id])

    console.log('info',productInfo)
  return (
   <Layout>
     <h1>Edit Product</h1>
    {productInfo &&  <ProductFrom {...productInfo}/>}
   </Layout>
  )
}

export default EditProductPage
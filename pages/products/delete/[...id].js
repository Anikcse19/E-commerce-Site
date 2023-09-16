/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import Layout from "@/components/Layout"
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const deleteProduct = () => {

    // // eslint-disable-next-line react-hooks/rules-of-hooks
    const router=useRouter()

    const {id}=router.query
    console.log(id)

    const [productInfo2,setProductInfo2]=useState(null)

    // // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{

        if(!id){
          return
        }
          axios.get('/api/products?id='+id).then(res=>{
            console.log(res.data)
           setProductInfo2(res.data)
          })
      },[id])




    function goBack(){
        router.push('/products')
    }

    async function deleteProduct(){
        await axios.delete('/api/products?id='+id)
        goBack()
    }
  return (
   <Layout>
     <h1>Do you want to delete {productInfo2?.title}  </h1>
     <button className='bg-red-900 px-3 py-2 text-white font-semibold rounded m-1' onClick={deleteProduct}>Yes</button>
     <button  className='bg-green-900 px-3 py-2 text-white font-semibold rounded m-1' onClick={goBack}>No</button>
   </Layout>


  )
}

export default deleteProduct
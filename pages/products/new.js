import React, { useState } from 'react'
import Layout from "@/components/Layout"
import axios from 'axios'
import { useRouter } from 'next/router'
import ProductFrom from '@/components/ProductFrom'

const NewProduct = () => {

  const router=useRouter()

  const [title, setTitle]=useState('')
  const [description, setDescription]=useState('')
  const [price, setPrice]=useState('')
  const [gotoProducts,setGotoProducts]=useState(false)

  async function createProduct(ev){
console.log('clicked')

    ev.preventDefault();
    const data={title,description,price};
    console.log(data)
    await axios.post('/api/products',data);
    setGotoProducts(true)

  }

  if(gotoProducts){
router.push('/products')
  }
  return (
   <Layout>
     <h1>New Product</h1>
    <ProductFrom/>
    
   </Layout>
  )
}

export default NewProduct
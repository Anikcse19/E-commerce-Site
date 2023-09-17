import React, { useEffect, useState } from 'react'
import Layout from "@/components/Layout"
import axios from 'axios'


const categories = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name,setName]=useState('')


    const saveCategory = async (ev) =>{
        ev.preventDefault()

       await axios.post('/api/category',{name})
        setName('')
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
            axios.get('/api/category').then(res=>{
                console.log(res.data)
            })
    },[])
  return (
    <Layout>
    <h1>Categories</h1>
    <label htmlFor="">Create new Category</label>
    <form onSubmit={saveCategory} className='flex gap-1'>
        
        <input className='w-[50%]' type="text" placeholder='caregory name' value={name} onChange={(ev)=>setName(ev.target?.value)} />
        <button type='submit' className="btn-primary">Save</button>
    </form>

    <table className='basic'>

    </table>
  </Layout>
  )
}

export default categories
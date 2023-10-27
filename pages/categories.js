/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';
import { FidgetSpinner, RotatingLines } from "react-loader-spinner";
import { useSession } from "next-auth/react";


function Categories({swal}) {

  const {data:session}=useSession()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editedCategoryToggle, setEditedCategoryToggle] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties]=useState([])


  // get all existing categories
  async function fetchCategories() {
    await axios.get("/api/category").then((res) => {
      setCategories(res.data);
      setParentCategory('')
    });
  }



  // create a new category
  const saveCategory = async (ev) => {

    ev.preventDefault();
    
    let data = { name,
      parentCategory,
      properties:properties.map(p => ({
        name:p.name,
        values:p.values.split(','),
      })),
    }
    
    // for update category
    if (editedCategoryToggle) {
      
      data._id = editedCategoryToggle._id;
      
      await axios.put("/api/category", data);
      
      setEditedCategoryToggle(null);
      
    }
    //for create new category 
    else {
      //hasnot any parent
      if(data.parentCategory===""){
        data.parentCategory=null
        await axios.post("/api/category", data);
      }
      //has parent
      else{
        await axios.post("/api/category", data);
      }
      // 
      
    }
    fetchCategories();
    setName("");
    setProperties([])

  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchCategories();
  }, []);

  

  function editedCategory(category) {
    setEditedCategoryToggle(category);
    setName(category?.name);
    setParentCategory(category?.parentCategory?._id);
    setProperties(category.properties.map(({name,values}) => ({
      name,
      values:values.join(',')
    })))
  }


  // Delete Category Modal
   function handelDeletdCategories(category){
    
    swal.fire({
      title: 'Are you sure?',
      text: `Want to delete ${category.name} ?`,
      showCancelButton:true,
      cancelButtonText:'cancel',
      confirmButtonText:'Yes, Delete',
      confirmButtonColor:'brown',
      reverseButtons:true
  }).then(async result => {
      console.log(result)
      console.log(result.isConfirmed)
      
      if (result.isConfirmed) {
        const {_id} = category;
        await axios.delete('/api/category?_id='+_id);
        fetchCategories();
      }
  })
  }

//  Add Property of Categories
  function addProperty() {
    setProperties(prev => {
      return [...prev, {name:'',values:''}];
    });
  }

  function handlePropertyName(index,property,newName){
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValues(index,property,newValues){
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p,pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  if(session){
    return (
    <Layout>
      <h1>Categories</h1>
      <label htmlFor="">
        {editedCategoryToggle
          ? `Edit Category:${editedCategoryToggle.name}`
          : "Create new Category"}
      </label>
      <form onSubmit={saveCategory} >
        <div className="flex flex-col md:flex-row gap-1">
        <input
          className="w-[50%]"
          type="text"
          placeholder="caregory name"
          value={name}
          onChange={(ev) => setName(ev.target?.value)}
        />
        <select
          onChange={(ev) => setParentCategory(ev.target.value)}
          value={parentCategory}
        >
          <option value={null}> No parent Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
          </div> <br/>
          <label>Properties</label>
          <button onClick={addProperty} className="bg-gray-500 py-1 px-2 ml-2 rounded-md mb-2" type='button'>Add new properties</button>
          {
            properties.length>0 && properties.map((property,index)=>(
              <div className="flex gap-1 mb-1" key={property._id}>
                <input 
                value={property.name}
                onChange={(ev)=>handlePropertyName(index,property,ev.target.value)}
                type='text' 
                placeholder='Property name. Ex: Color'/>
                <input 
                value={property.value}
                onChange={(ev)=>handlePropertyValues(index,property,ev.target.value)}
                type="text" 
                placeholder="Values.  Ex:red,blue,black (Should be Comma separated)"/>
                <button
                className="btn-primary"
                onClick={()=>removeProperty(index)}
                type="button">Remove</button>
              </div>
            ))
          }
        <div className="block">
          {
            editedCategoryToggle && (
              <button 
              onClick={()=>{setEditedCategoryToggle(null)
              setName('') 
              setParentCategory('')
              setProperties([])}
              
            }
              
              type="button" className="bg-gray-500 p-1 text-white font-bold">Cancel</button>)
          }
        <button type="submit" className="btn-primary">
          Save
        </button>
        </div>
      </form>


      {!editedCategoryToggle && (
          <table className="basic mt-5">
          <thead>
            <tr>
              <th className="text-left">Category Name</th>
              <th className="text-left">Parent Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody className=" ">
            {
              categories.length!=0 ?(categories.length > 0 &&
                categories.map((category) => (
                  <tr key={category._id}>
                    <td className="border-b-2">{category.name}</td>
                    <td className="border-b-2">{category?.parentCategory?.name}</td>
                    <td className="flex ">
                      <button
                        onClick={() => editedCategory(category)}
                        className="btn-primary mr-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button 
                      onClick={()=>handelDeletdCategories(category)}
                      className="btn-primary mr-1 rounded-md">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))):<div className="absolute left-[30%] top-[50%] w-[100px] ">
                <RotatingLines
              strokeColor="blue"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />
              </div>
            }
          </tbody>
        </table>
      )}

      
    </Layout>
  );}

  if(!session){
   return <div className="flex justify-center items-center h-full absolute left-[50%]">
      <FidgetSpinner
    visible={true}
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
    ballColors={['#ff0000', '#00ff00', '#0000ff']}
    backgroundColor="#F4442E"
  />
    </div>
  }
};

export default withSwal(({swal},ref)=>(
  <Categories swal={swal}/>
))



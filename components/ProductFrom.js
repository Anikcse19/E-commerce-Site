import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const ProductFrom = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images:existingImages
}) => {
  const router = useRouter();

  // console.log(existingTitle,existingDescription)
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [gotoProducts, setGotoProducts] = useState(false);
  const [isUploading,setIsUploading]=useState(false)
  const [images,setImages]=useState(existingImages || [])

  //   console.log(_id)
  async function saveProduct(ev) {
    console.log("clicked");

    ev.preventDefault();
    const data = { title, description, price };
    console.log("form", data);
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      console.log("post er agee", data);
      await axios.post("/api/products", data);
    }
    setGotoProducts(true);
  }

  if (gotoProducts) {
    router.push("/products");
  }

 
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      // setImages(oldImages => {
      //   return [...oldImages, ...res.data.links];
      // });
      setIsUploading(false);
    }
  }
  return (
    <div className="w-[90%]">
      <form onSubmit={saveProduct}>
        <label>Product Name</label> 
        <input
          type="text"
          name=""
          id=""
          placeholder="Name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
         <label>Photos</label> 
        <div className="mb-2">
          <label className="w-24 h-24 bg-gray-300 rounded-sm cursor-pointer text-center flex flex-col justify-center items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
<div>Upload</div>
<input type="file" hidden onChange={uploadImages} />
          </label>
        </div>
        <label>Product Description</label> <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Product Price</label> <br />
        <input
          type="text"
          name=""
          id=""
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductFrom;

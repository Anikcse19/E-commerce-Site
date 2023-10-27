import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const imgStorageApi = "fb3740bc653a7910499d04a143f890fc";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;

const ProductFrom = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) => {
  const router = useRouter();

  // console.log(existingTitle,existingDescription)
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [gotoProducts, setGotoProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [imgUrl, setImgUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(assignedCategory || "");

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCategories(res.data);
    });
  }, []);
  //   console.log(_id)
  

  if (gotoProducts) {
    router.push("/products");
  }
function saveProduct(ev) {
   ev.preventDefault();

  // async function uploadImages(ev) {
    const file = ev.target.images.files[0];
    // console.log(file)
    const formData = new FormData();
    formData.append("image", file);

    fetch(imgUploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          
          // axios.post("/api/upload/", {url:data.data.url,title:'anik',price:'123'});
            console.log(data);
            setImgUrl(data.data.url)
            const product = {
              title,
              description,
              price,
              category,
              properties: productProperties,
              url:data.data.url
            };
            console.log("form", product);
            if (_id) {
               axios.put("/api/products", { ...product, _id });
            } else {
              console.log("post er agee", product);
               axios.post("/api/products", product);
            }
            setGotoProducts(true);
          }
        });
      // }
    }

  // axios.post('/api/upload/',imgUrl)

  console.log(imgUrl);

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo?.properties);
    while (catInfo?.parentCategory?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parentCategory?._id
      );
      propertiesToFill.push(...parentCat?.properties);
      catInfo = parentCat;
    }
  }
  return (
    <div className="w-[90%]">
      <form onSubmit={saveProduct}>
        <label>Product Name</label> <br />
        <input
          type="text"
          name=""
          id=""
          placeholder="Name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />{" "}
        <br />
        <label>Category</label> <br />
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target?.value)}
        >
          <option value="f">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        <br />
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div key={p.name} className="">
              <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
              <div>
                <select
                  value={productProperties[p.name]}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                >
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label>Photos</label>
        <div className="mb-2">
          <label className="w-24 h-24 bg-gray-300 rounded-sm cursor-pointer text-center flex flex-col justify-center items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input type="file" hidden name="images" />
           
          </label>
        </div>
         <div className="w-[200px] h-[100px] border border-red-600">
          
              <img src={imgUrl} className="w-[180px] h-[80px]"/>
            </div>
        <label>Product Description</label> <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />{" "}
        <br />
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

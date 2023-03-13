import React, { useState, useRef } from 'react';
import "./AdminPanel.css";
import setTitle from './utilities/setTitle';

const Image = ({ images, setImages, index }) => {
    return (
        <div className="admin-panel-img-inputs">
            <input type="file" className="admin-panel-img-files" onChange={(e) => setImages([...images?.slice(0, index), e?.target?.files?.[0], ...images?.slice(index + 1)])}></input>
            <input className="admin-panel-img-orders" type="number" placeholder="Order" defaultValue={index} min="0" max={images.length - 1}></input>
        </div>
    )
}

const Sizes = ({ parentRef }) => {
    const sizes = Array(5).fill().map((size, index) => index + 1);
    const sizeLabels = ["S", "M", "L", "XL", "XXL"];
    return (
        <div ref={parentRef} id="admin-panel-sizes-container">
            {
                sizes?.map(size => {
                    return (
                        <span key={size}>
                            <input type="checkbox" id={`admin-panel-size-${size}`} value={size}></input>
                            <label htmlFor={`admin-panel-size-${size}`}>{sizeLabels[size - 1]}</label>
                        </span>
                    )
                })
            }
        </div>
    )
}

const Categories = ({ parentRef }) => {
    const categories = ['t-shirts', 'sweatshirts', 'bottoms', ];
    return (
        <div id="admin-panel-categories-container" ref={parentRef}>
            {
                categories?.map(category => {
                    return (
                        <div key={category}>
                            <input type="checkbox" id={`admin-panel-category-${category}`} value={category}></input>
                            <label htmlFor={`admin-panel-category-${category}`}>{category}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}

const AdminPanel = () => {
  setTitle("Admin Panel | VICE™ Official Website");

  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  const [ images, setImages ] = useState([]); 
  const sizesRef = useRef("");
  const categoriesRef = useRef("");
  const [ logs, setLogs ] = useState([]);

  const addHandler = (e) => {
    e.preventDefault();

    const getSizes = () => {
        const result = Array.from(sizesRef?.current?.children)?.map(span => {
            const checkbox = span?.children?.[0];
            if (!checkbox?.checked) return null;
            return checkbox?.value;
        });
        return result.filter(item => item !== null);
    }
    const getCategories = () => {
        const result = Array.from(categoriesRef?.current?.children)?.map(span => {
            const checkbox = span?.children?.[0];
            if (!checkbox?.checked) return null;
            return checkbox?.value;
        });
        return result.filter(item => item !== null);
    }

    const body = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        price: priceRef.current.value,
        categories: getCategories(),
        sizes: getSizes(),
        images: images.filter(item => item !== ""),
    };

    console.log(body.images);
    fetch("/api/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(json => setLogs([...logs, json.msg]));
  }

  const updateHandler = (e) => {
    e.preventDefault();
  }

  const deleteHandler = (e) => {
    e.preventDefault();
  } 

  return (
    <div id="admin-panel-container">
        <h2>Admin Panel</h2>
        <form className="admin-panel-form" onSubmit={addHandler}>
            <p className="admin-panel-titles">Add a new item</p>
            <input ref={nameRef} className="admin-panel-input" type="text" placeholder="Product Name" name="name" autoComplete='off'></input>
            <textarea ref={descriptionRef} id="admin-panel-description" placeholder="Product Description" name="description"></textarea>
            <input ref={priceRef} className="admin-panel-input" type="number" min="0" placeholder="Price (unit: cent)" name="price"></input>
            <button className="admin-panel-input" type="button" onClick={() => setImages([...images, ""])}>Add an image</button>
            {
                images?.length > 0 ?  <button className="admin-panel-input" type="button" onClick={() => setImages([...images.slice(0, -1)])}>Delete an image</button> : ""
            }
            <div id="admin-panel-image-container">
                {
                    images?.map((image, index) => {
                        return <Image images={images} setImages={setImages} index={index} key={index} />
                    })
                }
            </div>
            <Sizes parentRef={sizesRef} />
            <Categories parentRef={categoriesRef}/>
            <button className="admin-panel-input" type="submit">Submit</button>
        </form>
        <form className="admin-panel-form" onSubmit={updateHandler}>
            <p className="admin-panel-titles">Edit an item</p>
            <input className="admin-panel-input" type="text" placeholder="Product ID" name="id" autoComplete='off'></input>
            <button className="admin-panel-input" type="submit">Search</button>
        </form>
        <form className="admin-panel-form" onSubmit={deleteHandler}>
            <p className="admin-panel-titles">Delete an item</p>
            <input className="admin-panel-input" type="text" placeholder="Product ID" name="id" autoComplete='off'></input>
            <button className="admin-panel-input" type="submit">Delete</button>
        </form>
        <div id="admin-panel-log-container">
            <p className="admin-panel-titles">SERVER LOGS</p>
            {
                logs?.map((line, index) => {
                    return <p key={line + index}>{index + 1} | {line}</p>
                })
            }
        </div>
    </div>
  )
}

export default AdminPanel
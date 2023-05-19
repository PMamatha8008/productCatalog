import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import OutlinedInput from "@mui/material/OutlinedInput";

import { FloatingLabel, Form } from 'react-bootstrap'


const AddProductDetails = () => {
    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1976D2',
            },
            '&:hover fieldset': {
                borderColor: '#1976D2',
            },
        },
        '& .MuiInputBase-input': {
            color: '#1976D2',
            fontSize: '15px',
        },
        '& .MuiInputLabel-root': {
            color: '#1976D2',
            fontSize: '15px',
        },
    }

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState([]);
    const [productWeight, setProductWeight] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const imgPath = window.location.origin

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    useEffect(() => {
        fetch('http://localhost:8000/get-category')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error(error);
                // handle error
            });
    }, []);

    useEffect(() => {
        const id = (selectedCategory)
        //    console.log(typeof(id))
        if (id) {
            fetch(`http://localhost:8000/category-Id/${id}`)
                .then(response => response.json())
                .then(data => {
                    setSubCategories(data);
                })
                .catch(error => {
                    console.error(error);
                    // handle error
                });
        }
    }, [selectedCategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubCategory('');
    };

    const handleSubCategoryChange = (event) => {
        setSelectedSubCategory(event.target.value);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    };


    const handleProductImageChange = (e) => {

        const files = e.target.files;
        const updatedImages = [];
        for (let i = 0; i < files.length; i++) {

            const imagePath = imgPath + '/images/' + files[i].name;
            console.log(i)
            updatedImages.push(imagePath);
        }
        setProductImage(updatedImages);

        // setProductImage(imgPath + /images/ + e.target.files[0]);
    };
    // const handleProductImageChange = (e) => {

    //     const files = e.target.files;
    //     const updatedImages = [];
    //     for (let i = 0; i < files.length; i++) {
    //         const imagePath = imgPath +'/images/' + files[i].name;
    //         updatedImages.push(imagePath);
    //       }
    //     setProductImage(updatedImages);

    //     // setProductImage(imgPath + /images/ + e.target.files[0]);
    // };

    // }
    const handleProductWeightChange = (event) => {
        setProductWeight(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //   console.log(selectedCategory)
        const formData = {
            categoryId: (selectedCategory),
            subCategoryId: (selectedSubCategory),
            name: productName,
            description: productDescription,
            price: Number(productPrice),
            weight: parseFloat(productWeight),
            image: productImage

        };
        console.log(typeof (formData.image))

        fetch('http://localhost:8000/post-product', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                  }, 2000)
                  window.location.reload();
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    };

    // const handleClearButtonClick = () => {
    //     setValue([])
    //     setData({...data,name:''})
    //   };

    return (
        <>
            <div className="Auth-form-container ">
                <form onSubmit={handleSubmit}>
                    <div >
                        <h3 className="Auth-form-title">Product Details</h3>
                        <div>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <InputLabel id="demo-multiple-name-label" sx={{
                                    color: '#1976D2',
                                    fontSize: '15px',
                                }}>Category</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="category"
                                    size='small'
                                    value={selectedCategory}
                                    input={<OutlinedInput label="Category" />}
                                    MenuProps={MenuProps}
                                    onChange={handleCategoryChange}
                                    sx={{
                                        "&.MuiOutlinedInput-root": {
                                            "& fieldset": {
                                              borderColor: "#1976D2"
                                            },
                                            "&:hover fieldset": {
                                              borderColor: "#1976D2"
                                            },
                                            "&.Mui-focused fieldset": {
                                              borderColor: "#1976D2"
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#1976D2',
                                                fontSize: '15px',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#1976D2',
                                                fontSize: '15px',
                                            },
                                          }
                                        
                                    }}
                                    >
                                    {categories.map(category => (
                                        <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <InputLabel id="demo-multiple-name-label" sx={{
                                    color: '#1976D2',
                                    fontSize: '15px',
                                }}>Sub Category</InputLabel>
                                <Select
                                    id="subCategory"
                                    labelId="demo-multiple-name-label"
                                    size='small'
                                    label="Sub Category"
                                    MenuProps={MenuProps}
                                    value={selectedSubCategory}
                                    onChange={handleSubCategoryChange}
                                    sx={{
                                        "&.MuiOutlinedInput-root": {
                                            "& fieldset": {
                                              borderColor: "#1976D2"
                                            },
                                            "&:hover fieldset": {
                                              borderColor: "#1976D2"
                                            },
                                            "&.Mui-focused fieldset": {
                                              borderColor: "#1976D2"
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#1976D2',
                                                fontSize: '15px',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#1976D2',
                                                fontSize: '15px',
                                            },
                                          }
                                        
                                    }}
                                >
                                    {subCategories.map(subCategory => (
                                        <MenuItem key={subCategory.id} value={subCategory.name}>{subCategory.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <TextField
                                    type="text"
                                    label="Product Name"
                                    size="small"
                                    variant="outlined"
                                    value={productName}
                                    onChange={handleProductNameChange}
                                    sx={textFieldStyles}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <TextField id="outlined-multiline-static"
                                    label="Product Description"
                                    multiline
                                    rows={4}
                                    value={productDescription}
                                    onChange={handleProductDescriptionChange}
                                    sx={textFieldStyles}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <TextField
                                    type="number"
                                    label="Product Price"
                                    // name="productPrice"
                                    variant="outlined"
                                    size="small"
                                    value={productPrice}
                                    onChange={handleProductPriceChange}
                                    sx={textFieldStyles}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <TextField
                                    type="text"
                                    label="Product Weight"
                                    variant="outlined"
                                    size="small"
                                    name="productWeight"
                                    value={productWeight}
                                    onChange={handleProductWeightChange}
                                    sx={textFieldStyles}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    id="productImage"
                                    name="productImage"
                                    multiple
                                    defaultvalue={productImage}
                                    onChange={handleProductImageChange}
                                // onChange={(e) => setProductImage(data => ({ ...data, image: imgPath + /images/ + e.target.files[0].name }))}
                                />
                                <label htmlFor="productImage">
                                    <Button 
                                    variant="outlined" 
                                    component="span"
                                    sx={{
                                        width: 400,

                                        borderColor: '#1976D2', // Change the border color to blue
                                        '&:hover': {
                                            borderColor: '#1976D2', // Change the border color on hover to blue
                                        },
                                    }} >
                                         <span
                                        style={{
                                            fontSize: '12px', // Decrease the font size to 12px
                                        }}
                                    >
                                         Upload Image
                                    </span>
                                       
                                    </Button>
                                </label>

                            </FormControl>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button type="button"
                                // onClick={() => setFormData({ name: '' })}
                                className="btn btn-primary btn-lg btn-sm  my-5"
                                style={{ paddingRight: '25px', paddingLeft: '25px', backgroundColor: '#035F9B', marginRight: '9px' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-sm mx- my-5"
                                style={{ paddingRight: '25px', paddingLeft: '25px', backgroundColor: '#035F9B', marginRight: '9px' }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProductDetails;
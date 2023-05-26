import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import OutlinedInput from "@mui/material/OutlinedInput";
import { ProductTable } from './ProductTable';
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
            fontFamily: 'Open Sans',
        },
        '& .MuiInputLabel-root': {
            color: '#1976D2',
            fontSize: '13px',
            fontFamily: 'Open Sans',
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
    const [productWeight, setProductWeight] = useState(null);
    const [productKeywords, setProductKeywords] = useState('');
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
                // console.log(data)
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
                    // console.log(data)
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
        console.log(files)
        const updatedImages = [];
        for (let i = 0; i < files.length; i++) {

            const imagePath = '/images/' + files[i].name;
            updatedImages.push(imagePath);

        }
        setProductImage(updatedImages);
    };

    const handleProductWeightChange = (event) => {
        setProductWeight(event.target.value);
    };

    const handleProductKeywordsChange = (event) => {
        setProductKeywords(event.target.value);
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
            keyWords: productKeywords,
            image: productImage

        };
        console.log(typeof (formData.keyWords))

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

    const handleClearButtonClick = () => {
        setSelectedCategory('');
        setSelectedSubCategory('');
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductImage([]);
        setProductWeight('');
        setProductKeywords('');
    };

    return (
        <>
            <div
                style={{
                    // backgroundColor: '#f2f2f2',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    // padding: '20px',
                }}
            >
                <Paper elevation={10} >
                    <form onSubmit={handleSubmit} >
                        <Box
                            display="flex"
                            flexDirection={"column"}
                            maxWidth={500}
                            backgroundColor="white"
                            alignItems="center"
                            justifyContent={"center"}
                            // margin="auto"
                            // minHeight= '100vh'
                            // marginTop={25}
                            padding="20px 60px"
                            borderRadius={3}
                            boxShadow={'5px 5px 10px #ccc'}
                        // sx={{
                        //     ":hover": {
                        //         boxShadow: "10px 10px 20px #ccc"
                        //     }
                        // }}
                        >

                            <h3 className="Auth-form-title">Product Details</h3>
                            {/* <Grid container> */}
                            {/* <Grid item xs={6}> */}

                            <FormControl sx={{ m: 1, width: 400 }}>
                                <TextField
                                    // labelId="demo-multiple-name-label"
                                    label="Category"
                                    id="category"
                                    size='small'
                                    select
                                    displayEmpty
                                    value={selectedCategory}
                                    // input={<OutlinedInput label="Category" />}
                                    MenuProps={MenuProps}
                                    onChange={handleCategoryChange}
                                    sx={textFieldStyles}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                            {/* </Grid> */}
                            <Grid item xs={6}>
                                <div>
                                    <FormControl sx={{ m: 1, width: 400 }}>
                                        <TextField
                                            id="subCategory"
                                            // name="type"
                                            // labelId="demo-multiple-name-label"
                                            size='small'
                                            select
                                            displayEmpty
                                            label="Sub Category"
                                            MenuProps={MenuProps}
                                            value={selectedSubCategory}
                                            onChange={handleSubCategoryChange}
                                            sx={textFieldStyles}
                                        >
                                            {subCategories.map(subCategory => (
                                                <MenuItem key={subCategory.id} value={subCategory.name}>{subCategory.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </div>
                            </Grid>
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
                                    <TextField
                                        type="text"
                                        label="Product Keywords"
                                        size="small"
                                        variant="outlined"
                                        value={productKeywords}
                                        onChange={handleProductKeywordsChange}
                                        sx={textFieldStyles}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: 400 }}>
                                    <TextField id="outlined-multiline-static"
                                        label="Product Description"
                                        multiline
                                        rows={2}
                                        value={productDescription}
                                        onChange={handleProductDescriptionChange}
                                        sx={textFieldStyles}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1 }}>
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

                                                borderColor: '#f09916',
                                                '&:hover': {
                                                    borderColor: '#f09916',
                                                },
                                            }} >
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    color: '#f09916'
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
                                    onClick={handleClearButtonClick}
                                    className="btn btn-primary btn-lg btn-sm  my-3"
                                    style={{ paddingRight: '25px', paddingLeft: '25px', backgroundColor: '#035F9B', marginRight: '9px' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-sm my-3"
                                    style={{ paddingRight: '25px', paddingLeft: '25px', backgroundColor: '#035F9B', marginRight: '9px' }}
                                >
                                    Save
                                </button>
                                <div className="showcontent">
                                    {showSuccessMessage && (
                                        <div className="success-message">Successfully updated!</div>
                                    )}
                                </div>
                            </div>
                            {/* </Grid> */}
                        </Box>

                    </form>
                </Paper>
            </div>
            <div>
                {/* < ProductTable/> */}
            </div>
        </>
    )
}

export default AddProductDetails;






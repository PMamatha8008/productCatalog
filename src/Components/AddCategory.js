import React, { useState } from 'react'
import { TextField, Button, ButtonBase, Grid, FormControl, Box, Typography, Paper } from '@mui/material';

// import Jwellers from "../../public/jewelimages"

const AddCategory = () => {

    const [formData, setFormData] = useState({
    });
    const imgPath = window.location.origin
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);



    const handleSubmit = (event) => {
        event.preventDefault();

        // const formDataObj = new FormData();
        // formDataObj.append('name', formData.name);
        // formDataObj.append('image', formData.file);

        // console.log(formDataObj)

        console.log(formData)

        fetch("http://localhost:8000/post-category", {
            method: "POST",
            body: JSON.stringify(formData),

            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => (response.json()))
            .then((data) => {
                setFormData(data)
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 2000)
                window.location.reload();
            })
            .catch((error) => console.log(error));

    };


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData((data) => ({
                ...data,
                image: '/images/' + file.name,
            }));
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    // const handleClearClick = () => {
    //     setFormData("");
    // };

    return (
    
        
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
                        maxWidth={400}
                        backgroundColor="white"
                        alignItems="center"
                        justifyContent={"center"}
                        // margin="auto"
                        // minHeight= '100vh'
                        // marginTop={25}
                        padding="40px 60px"
                        borderRadius={3}
                        // boxShadow={'5px 5px 10px #ccc'}
                        // sx={{
                        //     ":hover": {
                        //         boxShadow: "10px 10px 20px #ccc"
                        //     }
                        // }}
                        >
                        <h3 className="Auth-form-title">Add Category</h3>
                        {/* <Typography variant="h6" padding={3} textAlign="center">Add Category</Typography> */}
                        {/* <Grid container spacing={2}> */}
                        {/* <Grid item xs={6}> */}

                        <FormControl sx={{ m: 1, width: 300 }}>
                            <TextField
                                label="Add category"
                                variant="outlined"
                                size='small'
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(data => ({ ...data, name: e.target.value }))}
                                sx={{
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
                                }}
                            />
                            {/* <label>Add category</label> */}
                        </FormControl>

                        {/* </Grid> */}
                        {/* <Grid item xs={6}> */}

                        {/* <label htmlFor="productImage">Upload Image:</label> */}

                        <FormControl sx={{ m: 1, width: 400 }}>
                            <Box textAlign="center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    id="productImage"
                                    name="productImage"
                                    defaultValue={formData.image}
                                    onChange={handleImageUpload}
                                // onChange={(e) => setFormData(data => ({ ...data, image: imgPath + /images/ + e.target.files[0].name }))}
                                // onChange={(e) =>setFormData(data => ({ ...data, image:window.location.origin+"/"+"jewelimages"+"/"+e.target.files[0].name }))}
                                // className="input-label"
                                />
                                <label htmlFor="productImage">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        sx={{
                                            width: 300,

                                            borderColor: '#f09916',
                                            '&:hover': {
                                                borderColor: '#f09916',
                                            },
                                        }}
                                    >
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
                            </Box>
                        </FormControl>

                        {showSuccessMessage && (
                            <p style={{ color: 'green', textAlign: 'center', fontSize: '0.8rem' }}>
                                Image uploaded successfully
                            </p>
                        )}

                        {/* </Grid> */}
                        {/* </Grid> */}
                        <div style={{ textAlign: 'center' }}>
                            <button type="button"
                                onClick={() => setFormData({ name: '' })}
                                className="btn btn-primary btn-lg btn-sm  my-3"
                                style={{ paddingRight: '25px', paddingLeft: '25px', backgroundColor: '#035F9B', marginRight: '9px' }}
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-sm my-3"
                                style={{ paddingRight: '25px', paddingLeft: '25px', backgroundColor: '#035F9B', marginRight: '9px' }}
                            >
                                Save
                            </button>
                        </div>
                    </Box>
                </form>
                </Paper>
            </div>
    
    )
}

export default AddCategory
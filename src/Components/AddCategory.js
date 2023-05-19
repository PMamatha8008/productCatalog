import React, { useState } from 'react'
import { TextField, Button, ButtonBase, Grid, FormControl } from '@mui/material';

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
    // const handleClearClick = () => {
    //     setFormData("");
    // };

    return (
        <>
            <div className="Auth-form-container">
                <form onSubmit={handleSubmit}>

                    <h3 className="Auth-form-title">Add category</h3>
                    {/* <Grid container spacing={2}> */}
                    {/* <Grid item xs={6}> */}
                    <div>
                        <FormControl sx={{ m: 1, width: 400 }}>
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
                                    }, },
                                    '& .MuiInputBase-input': {
                                        color: '#1976D2', 
                                        fontSize: '15px', 
                                      },
                                      '& .MuiInputLabel-root': {
                                        color: '#1976D2', 
                                        fontSize: '15px', 
                                      },
                                }}
                            />
                            {/* <label>Add category</label> */}
                        </FormControl>
                    </div>
                    {/* </Grid> */}
                    {/* <Grid item xs={6}> */}

                    {/* <label htmlFor="productImage">Upload Image:</label> */}
                    <div>
                        <FormControl sx={{ m: 1, width: 400 }}>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                id="productImage"
                                name="productImage"
                                defaultValue={formData.image}
                                onChange={(e) => setFormData(data => ({ ...data, image: imgPath + /images/ + e.target.files[0].name }))}
                            // onChange={(e) =>setFormData(data => ({ ...data, image:window.location.origin+"/"+"jewelimages"+"/"+e.target.files[0].name }))}
                            // className="input-label"
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
                                    }}
                                >
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

                </form>
            </div>
        </>
    )
}

export default AddCategory